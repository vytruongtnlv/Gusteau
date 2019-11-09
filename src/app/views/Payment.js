import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Button from '../components/Button';
import Modal from 'react-native-modal';
import PaymentOptions from '../components/PaymentOptions';
import { orderInputStyles, orderStyle } from '../style';
import Calculator from '../components/Calculator';
import { Input } from 'react-native-elements';



export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      showOptions: false,
      cash: 0
    };
  }
  cancelPayment() {
    this.setState({ showOptions: !this.state.showOptions });
  }



  paid(check) {
    this.setState({ showOptions: true })
  }

  onChangeText(text) {
    if (text.charAt(0) == 0) {
      var value = text.slice(1)
      this.setState({ cash: value })
    } else {
      this.setState({ cash: text })
    }
  }
  //Thanh toan -> Thu Tien -> Quet ma (1) Tao ma(2) Nhap ma(3)
  render() {
    const { navigation } = this.props
    const { cost } = navigation.state.params
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Text style={orderStyle.priceStyle}> Thanh toán </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
          <Text style={orderStyle.priceStyle}>Tổng tiền:</Text>
          <Text style={[orderStyle.priceStyle,]}>{cost}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
          <Text style={orderStyle.priceStyle}>Nhận:</Text>
          <Input
            defaultValue={`${this.state.cash}`}
            keyboardType="numeric"
            inputStyle={[{ textAlign: 'right', textDecorationLine: "underline" }, orderStyle.fontSize,]}
            inputContainerStyle={{ borderBottomWidth: 0, marginRight: "-2.25%" }}
            containerStyle={{ width: "50%", marginRight: "-2.35%" }}
            onChangeText={text => this.onChangeText(text)} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
          <Text style={orderStyle.priceStyle}>Tiền thối:</Text>
          <Text style={orderStyle.priceStyle}>{this.state.cash - cost}</Text>
        </View>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: "1.5%" }}>
          <Button title="Thanh toán" onPress={async () => await this.paid(enable)} />
        </View> */}
        <View style={{
          width: "100%",
          flexDirection: 'row',
        }}>
          <PaymentOptions cost={cost} show={this.state.showOptions} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
