import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class OrderDetail extends Component {

  render() {
    const list = this.props.foodList
    const { id, item } = this.props
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ width: '33.33%', textAlign: 'left' }}>{list[id].foodName}</Text>
        <Text style={{ width: '33.33%', textAlign: 'center' }}>x{item.quantity}</Text>
        <Text style={{ width: '33.33%', textAlign: 'right' }}>{list[id].price}$</Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    foodList: state.foodList.foodList
  }
}
export default connect(mapStateToProps)(OrderDetail)