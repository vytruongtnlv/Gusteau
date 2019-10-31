import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { connect } from 'react-redux';
import { orderInputChange, createOrder, deleteOrder } from '../actions';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { orderInputStyles } from '../style';
import { Input } from 'react-native-elements';
class OrderInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this._orderInputChange("quantity", 1)
    this._orderInputChange("note", "")
  }

  _orderInputChange(field, value) {
    this.props.orderInputChange({ field, value })
  }

  _orders() {
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
    const inputHeight = 55;
    const idCategory = this.props.category
    const idFood = this.props.currentFood
    const food = this.props.categoryList[idCategory]["dishes"][idFood]
    const name = food["name"] ? food["name"] : "Món"
    return (
      <View style={orderInputStyles.viewContent}>
        <Text style={orderInputStyles.foodName}>{name} x{this.props.quantity}</Text>
        <Input
          placeholder="Ghi chú"
          containerStyle={{ borderBottomWidth: 1, width: "25%", marginBottom: 5 }}
          onChangeText={text => this._orderInputChange("note", text)} />
        <NumericInput
          type='up-down'
          initValue={1}
          onChange={value => this._orderInputChange("quantity", value)}
          containerStyle={orderInputStyles.numericStyle}
          inputStyle={{ height: inputHeight, alignItems: 'center' }}
        />
        <View style={orderInputStyles.buttonRow}>
          <Button style={{ marginBottom: 10 }} title="Thêm" onPress={this._orders.bind(this)} />
          <Button style={{ marginBottom: 10 }} title="Huỷ" onPress={this.cancelOrder.bind(this)} />
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
