import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { connect } from 'react-redux';
import { orderInputChange, createOrder, deleteOrder } from '../actions';
import Button from '../components/Button';
class OrderInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.deleteOrder()
  }

  _orderInputChange(quantity) {
    const field = "quantity";
    const value = parseInt(quantity);
    this.props.orderInputChange({ field, value })
  }

  _orders() {
    const food = this.props.foodList[this.props.idFood];
    const priceKey = Object.keys(food["price"])
    let newOrder = {
      [this.props.idFood]: {
        quantity: this.props.quantity,
        idPrice: priceKey,
        foodName: food["foodName"],
        price: food["price"][priceKey]["price"]
      }
    }
    this.props.createOrder(newOrder)
  }

  render() {
    const inputHeight = 55;
    const name = this.props.idFood ? this.props.foodList[this.props.idFood].foodName : ""
    return (
      <View style={{ justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 20 }}>
        <Text style={{ fontSize: 24 }}> Orders </Text>
        {name != "" && <Text>{name} x{this.props.quantity}</Text>}
        <NumericInput
          type='up-down'
          initValue={1}
          onChange={value => this._orderInputChange(value)}
          containerStyle={{ height: inputHeight, marginVertical: 10 }}
          inputStyle={{ height: inputHeight }}
        />
        <Button style={{ marginBottom: 10 }} title="Add order" onPress={this._orders.bind(this)} />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    foodList: state.foodList.foodList,
    idFood: state.orders.idFood,
    quantity: state.orders.quantity,
    idPrice: state.orders.idPrice,
  }
}
export default connect(mapStateToProps, { orderInputChange, createOrder, deleteOrder })(OrderInputForm)
