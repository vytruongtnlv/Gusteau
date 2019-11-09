import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Button from './Button';
import { Input, ButtonGroup, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { getBillByIdTable } from '../logics';
import Calculator from './Calculator';
import ScanScreen from '../views/ScanScreen';
import MemberList from '../views/MemberList';
import PaymentComponent from './PaymentComponent';
import { appColor } from '../style';

const btnNo = () => <Text>Không</Text>
const btnQR = () => <Text>Quét mã QR</Text>
const btnCreate = () => <Text>Tạo mã mới</Text>
const btnEnter = () => <Text>Nhập số điện thoại</Text>

class PaymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  scanQR() {
    this.props.navigation.navigate('ScanScreen')
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
      const obj = checkOutByTable(this.props.idTable)
      this.props.updateData(obj);
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
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  renderView() {
    switch (this.state.selectedIndex) {
      case 0:
        return (
          <PaymentComponent />
        )
      case 1:
        return this.props.navigation.navigate('ScanScreen', { cost: this.props.cost });
      case 2:
        return this.props.navigation.navigate('QrCreator', { cost: this.props.cost });
      case 3:
        return this.props.navigation.navigate('MemberList', { cost: this.props.cost });
    }
  }

  render() {
    const buttons = [{ element: btnNo }, { element: btnQR }, { element: btnCreate }, { element: btnEnter }]
    const { selectedIndex } = this.state

    return (
      <View style={{ width: "100%" }}>
        <ButtonGroup
          buttonStyle={[{ justifyContent: 'center', alignItems: 'center' }]}
          selectedButtonStyle={{ backgroundColor: appColor.blue, }}
          onPress={this.updateIndex.bind(this)}
          selectedIndex={selectedIndex}
          buttons={buttons} />
        {this.renderView()}
      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    memberList: state.members.members,
  }
}

export default connect(mapStateToProps, {})(PaymentOptions)