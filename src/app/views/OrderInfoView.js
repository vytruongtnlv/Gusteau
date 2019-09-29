import React, { Component } from 'react';
import { View, Text } from 'react-native';
import OrderDetail from '../components/OrderDetail'
import OrderInputForm from './OrderInputForm';
import { connect } from 'react-redux';
class OrderInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  displayOrders() {
    console.log(this.props.orders)
    console.log('---------------------------**')
    return Object.keys(this.props.orders).map(id => {
      return <OrderDetail item={this.props.orders[id]} id={id} key />
    })
  }

  render() {
    return (
      <View style={this.props.style}>
        <OrderInputForm />
        <Text>Table</Text>
        {this.displayOrders()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders
  }
}

export default connect(mapStateToProps)(OrderInfoView)
