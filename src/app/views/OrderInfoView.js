// "android-shake": "adb shell input keyevent 82"
import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import OrderDetail from '../components/OrderDetail'
import OrderInputForm from './OrderInputForm';
import { connect } from 'react-redux';
import { currentTable, updateData, retrieveBillList } from '../actions'
import { getBillByIdTable, changeTableStatus } from '../logics';
import Button from '../components/Button';
import { orderStyle, appStyle, orderInputStyles } from '../style';
import { setConst } from '../config';
import Calculator from '../components/Calculator';
import Modal from 'react-native-modal';

const logo = require('../../img/lotteria.png');
class OrderInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      showCal: false,
      totalPrice: 0,
      isModalVisible: false,
      check: false,
    };
  }

  componentDidMount() {
    this.props.retrieveBillList();
    this.setState({
      totalPrice: this._calTotalPrice()
    })
  }

  displayOrders() {
    return Object.keys(this.props.orders).map(id => {
      return <OrderDetail item={this.props.orders[id]} id={id} key={id} />
    })
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
    if (JSON.stringify(this.props.orders) != JSON.stringify(nextProps.orders)) {
      this.setState({
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

  async _createAnOrder() {
    // key='bill'
    if (this.state.check == false) {
      alert('Vui lòng xác nhận đã thanh toán!');
      return;
    }
    if (this.props.tableList[this.props.idTable]["tableStatus"] == setConst.empty) {
      this.handleNewBill()
      this.changeTableStatus(this.props.idTable, setConst.ordered)
    }
    else if (this.props.tableList[this.props.idTable]["tableStatus"] == setConst.ordered) {
      console.log('old bill')
    }
    const idBill = await getBillByIdTable(this.props.idTable);
    this.addOrderIntoBill(idBill)
    this.props.navigation.goBack();
  }

  _calTotalPrice() {
    let value = 0;
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
      isModalVisible: true,
      // showCal: true,
      totalPrice: price
    })
  }

  async checkMethod() {
    await this.setState({
      check: true,
      isModalVisible: false
    })
  }

  render() {
    return (
      <View>
        <Modal
          style={{ justifyContent: 'center', alignItems: 'center', }}
          isVisible={this.state.isModalVisible}>
          <View style={{ borderRightWidth: 1, width: "100%", height: "75%", alignItems: 'center', flexDirection: 'column' }}>
            <Calculator totalPrice={this.state.totalPrice} callBackFunction={this.checkMethod} />
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

            <View style={{ width: "50%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', }}>
              <Button title='Thanh toán' onPress={() => this.payment()} />
              <Button title='In hoá đơn' onPress={this._createAnOrder.bind(this)} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    tableList: state.tableDB.tableList,
    idTable: state.tableDB.idTable,
    foodList: state.foodList.foodList
  }
}

export default connect(mapStateToProps, { currentTable, updateData, retrieveBillList })(OrderInfoView)
