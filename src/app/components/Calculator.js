import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Button from './Button';
import { orderStyle, appStyle } from '../style';

export default class Calculator extends Component {
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
  }

  async payment() {
    const price = await this._calTotalPrice();
    await this.setState({
      isModalVisible: true,
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
    this.props.callBackFunction()
  }

  render() {
    const total = this.props.totalPrice;
    return (
      <View style={{ backgroundColor: 'black' }}>
        <View style={{ flexDirection: 'row', width: "100%", padding: appStyle.padding }}>
          <View style={{ alignItems: 'flex-start', width: "50%", marginLeft: appStyle.padding }}>
            <Text style={orderStyle.priceStyle}>Tổng tiền:</Text>
            <Text style={orderStyle.priceStyle}>Nhận:</Text>
            <Text style={orderStyle.priceStyle}>Tiền thối:</Text>
          </View>
          <View style={{ alignItems: 'flex-end', width: "50%", marginRight: appStyle.padding }}>
            <Text style={orderStyle.priceStyle}>{total}</Text>
            <Text style={orderStyle.priceStyle}>{this.state.cash}</Text>
            <Text style={orderStyle.priceStyle}>{this.state.cash - total}</Text>
          </View>
        </View>
        <View style={{ height: "50%", width: "100%", flexDirection: 'column', backgroundColor: 'white' }}>
          {this.setSign()}
          {this.setButtonPosition(1000, 2000, 5000)}
          {this.setButtonPosition(10000, 20000, 50000)}
          {this.setButtonPosition(100000, 200000, 500000)}
          <Button title='Huỷ' onPress={this.cancelPayment.bind(this)} />
          <Button title='Đã thu' onPress={this.accept.bind(this)} />
        </View>

      </View >

    );
  }
}
