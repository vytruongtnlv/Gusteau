// "android-shake": "adb shell input keyevent 82"
import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import OrderDetail from '../components/OrderDetail'
import OrderInputForm from './OrderInputForm';
import { connect } from 'react-redux';
import { currentTable, updateData, retrieveBillList, otherInput, createOrder } from '../actions'
import { getBillByIdTable, changeTableStatus, checkOutByTable } from '../logics';
import Button from '../components/Button';
import { orderStyle, appStyle, orderInputStyles } from '../style';
import { setConst } from '../config';
import Calculator from '../components/Calculator';
import Modal from 'react-native-modal';
import { servedToCustomer } from '../logics/checkOut';
import Tabs from '../../../Tabs';

const logo = require('../../img/lotteria.png');
class OrderInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      showCal: false,
      totalPrice: 0,
      isModalVisible: false,
      paid: false,
    };
    this.idBill = getBillByIdTable(this.props.idTable)
    this.bill = {}
  }

  componentDidMount() {
    const bill = this.getBillInfo();
    this.bill = this.getBillInfo()
    this._orders();
    this.billWasPaid((bill && bill["price"]) ? true : false)
    this.setState({
      paid: (bill && bill["price"]) ? true : false,
      totalPrice: this._calTotalPrice()
    })
  }

  billWasPaid(value) {
    const payment = {
      field: "paid",
      value: value
    }
    this.props.otherInput(payment)
  }

  _orders() {
    if (this.bill && this.bill["billInfo"]) {
      let newOrder = {
        [this.idBill]: this.bill
      }
      this.props.createOrder(newOrder);
    }

  }

  handleNewBill() {
    const key = "bill";
    const value = {
      "dateCheckIn": new Date().getTime(),
      "idTable": this.props.idTable
    };
    this.props.updateData({ key, value });
  }

  componentWillReceiveProps(nextProps) {
    const bill = this.getBillInfo();
    if (JSON.stringify(this.props.orders) != JSON.stringify(nextProps.orders) ||
      JSON.stringify(this.props.bill) != JSON.stringify(nextProps.bill)
    ) {
      this.billWasPaid((bill && bill["price"]) ? true : false)
      this.setState({
        payment: (bill && bill["price"]) ? true : false,
        totalPrice: this._calTotalPrice()
      })
    }
  }

  changeTableStatus() {
    const id = this.props.idTable;
    const obj = changeTableStatus(id, setConst.ordered)
    this.props.updateData(obj)
  }

  addOrderIntoBill(idBill) {
    const key = `bill/${idBill}/billInfo`; // idBillinfo , idFood, Quantity, idPrice, idBill, available
    Object.keys(this.props.orders).forEach(idFood => {
      var order = this.props.orders[idFood]
      var value = {
        "idFood": idFood,
        "name": order["name"],
        "quantity": order["quantity"],
        "note": order["note"],
        "price": order["price"],
      }
      this.props.updateData({ key, value })
    })
  }

  _createAnOrder() {
    if (this.props.tableList[this.props.idTable]["tableStatus"] == setConst.empty) {
      this.handleNewBill()

      this.changeTableStatus(this.props.idTable, setConst.ordered)//check 
    }
    else if (this.props.tableList[this.props.idTable]["tableStatus"] == setConst.ordered) {
      console.log('old bill')
    }
    const idBill = getBillByIdTable(this.props.idTable); //check 
    this.addOrderIntoBill(idBill)
  }

  _calTotalPrice() {
    let value = 0;
    const bill = this.getBillInfo();
    if (bill && bill["price"]) {
      value += bill["price"];
    }
    if (Object.keys(this.props.orders).length > 0)
      Object.keys(this.props.orders).forEach(id => {
        value += this.props.orders[id]["price"] * this.props.orders[id]["quantity"]
      });

    return value;
  }

  cancelPayment() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  async payment() {
    const price = await this._calTotalPrice();
    await this.setState({
      // isModalVisible: true,
      // showCal: true,
      totalPrice: price
    })

  }

  alertForPaymen = () => {
    this._createAnOrder()
    this.handleCheckOut()
    this.billWasPaid()
    alert('Đã thanh toán')
  }

  async checkMethod() {
    await this.setState({
      check: true,
      isModalVisible: false
    })
  }


  handleCheckOut() {
    if (this.props.idTable != "") {
      const obj = checkOutByTable(this.props.idTable)
      this.props.updateData(obj);

    }
  }

  servedToCustomer() {
    if (this.props.idTable != "") {
      const obj = servedToCustomer(this.props.bill, this.props.idTable)
      this.props.updateData(obj);
      const tableObj = changeTableStatus(this.props.idTable, setConst.empty)
      this.props.updateData(tableObj);

      // this.props.navigation.navigate()

    }
    this.props.navigation.navigate("Tabs")
  }

  displayOrders() {
    const idBill = getBillByIdTable(this.props.idTable)
    if (idBill) {
      const billinfo = this.props.bill[idBill]["billInfo"]
      if (billinfo)
        return Object.keys(billinfo).map(id => {
          return <OrderDetail item={billinfo[id]} id={id} key={id} />
        })
    } else {
      return Object.keys(this.props.orders).map(id => {
        return <OrderDetail item={this.props.orders[id]} id={id} key={id} />
      })
    }
  }

  getBillInfo() {
    const idBill = getBillByIdTable(this.props.idTable)
    if (idBill) {
      const bill = this.props.bill[idBill]
      if (bill && bill["price"]) {
        this.billWasPaid(true)
        this.setState({
          paid: true,
        })
        return bill
      }
    }
    return null;
  }

  render() {
    return (
      <View>
        <Modal
          style={{ justifyContent: 'center', alignItems: 'center', width: "100%", height: "75%", }}
          isVisible={this.state.isModalVisible}>
          <View style={{ borderRightWidth: 1, alignItems: 'center', flexDirection: 'row' }}>
            <Calculator totalPrice={this.state.totalPrice} navigation={this.props.navigation} />
          </View>
        </Modal>
        <View style={orderStyle.orderView}>
          <Image
            style={{ height: "7.5%", width: "100%" }}
            resizeMode="center"
            source={logo} />
          <Text style={orderStyle.orderTitle}>Hoá đơn</Text>
          <View style={{ borderBottomWidth: 1, minHeight: "45%", borderBottomColor: 'black', borderTopColor: 'white', borderTopWidth: 1 }}>
            {this.displayOrders()}
          </View>
          <View style={{ flexDirection: 'row', position: "absolute", bottom: 0, justifyContent: 'space-between', height: "35%", width: "100%", alignItems: "center" }}>
            <Text style={orderStyle.priceStyle}>Tổng tiền: {this.state.totalPrice} {this.props.paid ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
            <View style={{ width: "50%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', }}>
              <View pointerEvents={this.props.paid ? 'none' : 'auto'}>
                <Button title='Thanh toán' onPress={() => this.alertForPaymen()} />
              </View>
              <Button title='Đã phục vụ' onPress={this.servedToCustomer.bind(this)} />
            </View>
          </View>
        </View>
      </View>
    );
  }
} 44

const mapStateToProps = state => {
  return {
    bill: state.bill.bill,
    orders: state.orders.orders,
    tableList: state.tableDB.tableList,
    idTable: state.tableDB.idTable,
    foodList: state.foodList.foodList,
    paid: state.other.paid
  }
}

export default connect(mapStateToProps, { createOrder, currentTable, updateData, retrieveBillList, otherInput })(OrderInfoView)
