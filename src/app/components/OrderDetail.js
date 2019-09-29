import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class OrderDetail extends Component {

  render() {
    console.log('-------->>>>')
    const list = this.props.foodList
    const { id, item } = this.props
    console.log('item', id)
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ width: '33.33%', textAlign: 'left' }}>{list[id].foodName}</Text>
        <Text style={{ width: '33.33%', textAlign: 'center' }}>{item.quantity}</Text>
        <Text style={{ width: '33.33%', textAlign: 'right' }}>{item.idPrice}</Text>
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