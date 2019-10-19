import React, { Component } from 'react';
import { View, Text } from 'react-native';
import OrderDetail from '../components/OrderDetail'
import OrderInputForm from './OrderInputForm';
import { connect } from 'react-redux';
import { currentTable, updateData, retrieveBillList } from '../actions'
import { getBillByIdTable, changeTableStatus } from '../logics';
import Button from '../components/Button';
class OrderInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  componentDidMount() {
    this.props.retrieveBillList()
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

  changeTableStatus() {
    const id = this.props.idTable;
    const obj = changeTableStatus(id, "Ordered")
    this.props.updateData(obj)
  }

  addOrderIntoBill(idBill) {
    const key = `bill/${idBill}/billInfo`; // idBillinfo , idFood, Quantity, idPrice, idBill, available
    Object.keys(this.props.orders).forEach(idFood => {
      var order = this.props.orders[idFood]
      var value = {
        "idFood": idFood,
        "foodName": order["foodName"],
        "quantity": order["quantity"],
        "price": order["price"],
        "idPrice": order["idPrice"]
      }
      this.props.updateData({ key, value })
    })
  }

  async _createAnOrder() {
    // key='bill'
    if (this.props.tableList[this.props.idTable]["tableStatus"] == 'Empty') {
      this.handleNewBill()
      this.changeTableStatus(this.props.idTable, "Ordered")
    }
    if (this.props.tableList[this.props.idTable]["tableStatus"] == 'Ordered') {
      console.log('old bill')
    }
    const idBill = await getBillByIdTable(this.props.idTable);
    this.addOrderIntoBill(idBill)
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={this.props.style}>
        <OrderInputForm />
        <Text style={{ fontSize: 24 }}>Table List</Text>
        {this.displayOrders()}
        <View style={{ position: "absolute", bottom: 10, justifyContent: 'center', width: "100%", alignItems: "center" }}>
          <Button title='Order' onPress={this._createAnOrder.bind(this)} />
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
