import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class OrderDetail extends Component {

  render() {
    const { id, item } = this.props
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ width: '33.33%', textAlign: 'left', fontSize: 20 }}>{item.name} {item.note}</Text>
        <Text style={{ width: '33.33%', textAlign: 'center', fontSize: 20 }}>x{item.quantity}</Text>
        <Text style={{ width: '33.33%', textAlign: 'right', fontSize: 20 }}>{item.price}đ</Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps)(OrderDetail)