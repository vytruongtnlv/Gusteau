import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class OrderDetail extends Component {


  deleteOrder() {
    const { id, item } = this.props
    this._orderInputChange("currentFood")

    alert('Xoá ', id)
  }

  render() {
    const { id, item } = this.props
    if (item)
      return (
        // <TouchableOpacity onLongPress={() => this.deleteOrder()}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ width: '33.33%', textAlign: 'left', fontSize: 16 }}>{item.name} {item.note}</Text>
          <Text style={{ width: '33.33%', textAlign: 'center', fontSize: 16 }}>x{item.quantity}</Text>
          <Text style={{ width: '33.33%', textAlign: 'right', fontSize: 16 }}>{item.price}đ</Text>
        </View>

        // </TouchableOpacity>

      );
    else return null
  }
}
const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps)(OrderDetail)