import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { connect } from 'react-redux';
import { orderInputChange, createOrder, deleteOrder } from '../actions';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { orderInputStyles, appColor } from '../style';
import { Input, Icon } from 'react-native-elements';
class OrderInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (this.props.id && this.props.item) {
      if (Object.keys(this.props.item)[0]) {
        this._orderInputChange("quantity", this.props.item["quantity"])
        this._orderInputChange("note", this.props.item["note"])
      }
    }
    else {
      this._orderInputChange("quantity", 1)
      this._orderInputChange("note", "")
    }

  }

  _orderInputChange(field, value) {
    this.props.orderInputChange({ field, value })
  }

  _orders() {
    if (this.props.id && this.props.item) {
      this.oldOrder()
    }
    else {
      this.newOrder()
    }

  }
  oldOrder() {
    const item = this.props.item
    let newOrder = {
      [this.props.id]: {
        quantity: this.props.quantity,
        name: item["name"],
        price: item["price"],
        note: this.props.note
      }
    }
    this.props.createOrder(newOrder);
    this.cancelOrder();
  }

  newOrder() {
    const idCategory = this.props.category
    const idFood = this.props.currentFood
    const food = this.props.categoryList[idCategory]["dishes"][idFood]
    const price = food["price"]["value"]
    let newOrder = {
      [idFood]: {
        quantity: this.props.quantity,
        name: food["name"],
        price: price,
        note: this.props.note
      }
    }
    this.props.createOrder(newOrder);
    this.cancelOrder();
  }

  cancelOrder() {
    this.props.callBackFunction()
  }

  render() {
    const idCategory = this.props.category
    const idFood = this.props.id ? this.props.id : this.props.currentFood
    const food = this.props.item ? this.props.item : this.props.categoryList[idCategory]["dishes"][idFood]
    const name = food["name"] ? food["name"] : "Món"
    const note = this.props.item ? this.props.item["note"] : "Ghi chú"
    return (
      <View style={orderInputStyles.viewContent}>
        <Text style={orderInputStyles.foodName}>{name} x{this.props.quantity}</Text>
        <Input
          placeholder="Ghi chú"
          value={this.props.note}
          containerStyle={orderInputStyles.inputStyle}
          onChangeText={text => this._orderInputChange("note", text)} />
        <NumericInput
          type='plus-minus'
          initValue={this.props.quantity}
          onChange={value => this._orderInputChange("quantity", value)}
          containerStyle={orderInputStyles.numericStyle}
          inputStyle={orderInputStyles.numericInputStyle}
        />
        <View style={[orderInputStyles.buttonRow, { justifyContent: 'space-around', }]}>
          <Button
            style={{ marginBottom: 10, marginLeft: 10, backgroundColor: appColor.focusedColor, }}
            title="Thêm"
            icon={<Icon name="add" type="ionicons" />}
            onPress={this._orders.bind(this)} />
          <Button
            style={{ marginBottom: 10, backgroundColor: appColor.unfocusedColor, }}
            title="Huỷ"
            icon={<Icon name="close" type="ionicons" />}
            onPress={this.cancelOrder.bind(this)} />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    quantity: state.orders.quantity,
    note: state.orders.note,
    currentFood: state.orders.currentFood,
    categoryList: state.category.categoryList,
    category: state.category.category

  }
}
export default connect(mapStateToProps, { orderInputChange, createOrder, deleteOrder })(OrderInputForm)
