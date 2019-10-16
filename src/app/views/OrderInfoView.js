import React, { Component } from 'react';
import { View, Text } from 'react-native';
import OrderDetail from '../components/OrderDetail'
import OrderInputForm from './OrderInputForm';
import { connect } from 'react-redux';
import { currentTable, updateData, retrieveBillList } from '../actions'
import { Button } from 'react-native-elements';
import { getBillByIdTable } from '../logics';
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
    const key = "tableFood";
    var value = this.props.tableList[this.props.idTable];
    const id = this.props.idTable;
    value = {
      ...value,
      ["tableStatus"]: "Ordered"
    }
    this.props.updateData({ key, value, id });
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
      this.changeTableStatus()
    }
    if (this.props.tableList[this.props.idTable]["tableStatus"] == 'Ordered') {
      console.log('old bill')
    }
    const idBill = await getBillByIdTable(this.props.idTable);
    this.addOrderIntoBill(idBill)
  }

  render() {
    return (
      <View style={this.props.style}>
        <OrderInputForm />
        <Text>Table</Text>
        {this.displayOrders()}
        <Button title='Order' onPress={this._createAnOrder.bind(this)} />

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
