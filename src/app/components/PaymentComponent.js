import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateData } from '../actions';
import { changeTableStatus, checkOutByTable, getBillByIdTable } from '../logics';
import { setConst } from '../config';
import Button from './Button';

class PaymentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0,
      member: {},
      discount: 0,
      idMember: ""
    };
  }

  componentDidMount() {
    const { member, idMember, option } = this.props
    this.setState({ member, idMember, option })
  }

  setPoint() {
    const { member, idMember, option, cost } = this.state
    const point = cost * 0.002
    Alert.alert(
      'Tích điểm thành viên',
      `Tích ${point} L.Point cho tài khoản ${member["tel"]}`,
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => this.updatePoint(point) },
      ],
      { cancelable: false },
    );
  }


  updatePoint = (point, reset) => {
    const { member, idMember, option } = this.state
    if (member) {
      const updateValue = {
        key: "members",
        value: {
          ...member,
          "point": reset ? point : member["point"] + point
        },
        id: idMember
      }
      this.setState({ point: reset ? point : member["point"] + point })
      this.props.updateData(updateValue)
      this._createAnOrder();
    }
    else {
      alert('Không tìm thấy mã!')
    }
  }

  discount() {
    const { member, idMember, option } = this.state
    var discount = parseInt(member["point"] / 1000) * 1000
    this.setState({ discount: discount })
    var remain = member["point"] - discount
    alert(`Khách hàng được giảm ${discount}đ`)
    this.updatePoint(remain, true)
  }

  handleOption() {
    const { member, idMember, option } = this.state
    if (option)
      switch (option) {
        case 0:
          this.setPoint()
          break;
        case 1:
          return this.discount();
          break;
      }
    else {
      this._createAnOrder()
    }
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
      const obj = checkOutByTable(this.props.idTable, this.state.discount)
      this.props.updateData(obj);
      alert("Thanh toán thành công!");
      this.props.navigation.navigate("Home")
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
        <Button title="Thanh toán" onPress={async () => this.handleOption()} />
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