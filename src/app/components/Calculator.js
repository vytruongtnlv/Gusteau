import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Button from './Button';
import { orderStyle, appStyle } from '../style';
import { connect } from 'react-redux';
import { otherInput } from '../actions';
import { Input } from 'react-native-elements';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
      value: 0,
      sign: "+"
    };
  }

  displayCalButton(value) {
    return (
      <Button title={`${value}đ`} onPress={() => this.calCash(value)} />
    )
  }
  calCash(value) {
    let total = 0;
    switch (this.state.sign) {
      case "+":
        total += value
        break;
      case "-":
        total -= value
        break;
    }
    this.setState({ cash: this.state.cash + total })
  }

  cancelPayment() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.goBack();
  }

  async payment() {
    const price = await this._calTotalPrice();
    await this.setState({
      // showCal: true,
      totalPrice: price
    })
  }

  setSign() {
    return (
      <View>
        <Button title="+" onPress={() => this.setState({ sign: "+" })} />
        <Button title="-" onPress={() => this.setState({ sign: "-" })} />
        <Button title="=" onPress={() => this.calCash(0)} />
      </View>
    )
  }

  setButtonPosition(val1, val2, val3) {
    return (
      <View>
        {this.displayCalButton(val1)}
        {this.displayCalButton(val2)}
        {this.displayCalButton(val3)}
      </View>
    )
  }

  accept() {
    const field = "isPayment";
    const value = true
    this.props.otherInput({ field, value })
    this.props.navigation.goBack();
  }

  render() {
    const total = this.props.totalPrice;
    return (
      <View>
        <View style={{ flexDirection: 'row', width: "100%", padding: appStyle.padding }}>
          <Text style={orderStyle.priceStyle}>Tổng tiền:</Text>
          <Text style={orderStyle.priceStyle}>Nhận:</Text>
          <Text style={orderStyle.priceStyle}>Tiền thối:</Text>
        </View>
        <Input
          placeholder="Số tiền nhận"
          keyboardType="numeric"
          onChangeText={text => this.setState({ cash: text })} />
        <Button title='Huỷ' onPress={this.cancelPayment.bind(this)} />
        <Button title='Đã thu' onPress={this.accept.bind(this)} />
      </View >

    );
  }
}

export default connect(null, { otherInput })(Calculator)