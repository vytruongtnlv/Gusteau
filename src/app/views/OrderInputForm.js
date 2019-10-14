import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { connect } from 'react-redux';
import { orderInputChange, createOrder } from '../actions';
class OrderInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _orderInputChange(quantity) {
    const field = "quantity";
    const value = parseInt(quantity);
    this.props.orderInputChange({ field, value })
  }

  _orders() {
    let newOrder = {
      [this.props.idFood]: {
        quantity: this.props.quantity,
        idPrice: this.props.idPrice,
        price: this.props.foodList[this.props.idFood].price
      }
    }
    this.props.createOrder(newOrder)
  }

  render() {
    const inputHeight = 55;
    const name = this.props.idFood ? this.props.foodList[this.props.idFood].foodName : "Name"
    return (
      <View style={{ justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 20 }}>
        <Text> OrderInputForm </Text>
        <Text>{name} x{this.props.quantity}</Text>
        <NumericInput
          type='up-down'
          initValue={1}
          onChange={value => this._orderInputChange(value)}
          containerStyle={{ height: inputHeight }}
          inputStyle={{ height: inputHeight }}
        />
        <TouchableOpacity style={{ width: 100, height: 50 }} onPress={this._orders.bind(this)}>
          <Text>Button add</Text>
        </TouchableOpacity>
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
export default connect(mapStateToProps, { orderInputChange, createOrder })(OrderInputForm)
