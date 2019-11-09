import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { updateData } from '../actions';
import { changeTableStatus, checkOutByTable, getBillByIdTable } from '../logics';
import { setConst } from '../config';
import Button from './Button';

class PaymentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _createAnOrder() {
    if (this.props.tableList[this.props.idTable]["tableStatus"] == setConst.empty) {
      this.handleNewBill()
      this.changeTableStatus()//check 
    }
    const idBill = getBillByIdTable(this.props.idTable); //check 
    this.addOrderIntoBill(idBill)
  }

  handleCheckOut() {
    if (this.props.idTable != "") {
      const obj = checkOutByTable(this.props.idTable, this.props.discount)
      this.props.updateData(obj);
      alert("Thanh toán thành công!");
      this.props.navigation.navigate("Tabs")
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
    this.handleCheckOut()
  }

  render() {
    return (
      <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Thanh toán" onPress={async () => this._createAnOrder()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberList: state.members.members,
    orders: state.orders.orders,
    tableList: state.tableDB.tableList,
    idTable: state.tableDB.idTable,
  }
}

export default connect(mapStateToProps, { updateData })(PaymentComponent)