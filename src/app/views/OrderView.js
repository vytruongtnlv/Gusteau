import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux'
import { retrieveBillList } from '../actions';
import { appStyle, styles } from '../style';
import OrderTab from '../../../OrderTab';
class OrderView extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <OrderTab navigation={this.props.navigation} />
        {/* <FoodListView style={[styles.bigContainer]} navigation={this.props.navigation} /> */}
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, { retrieveBillList })(OrderView)


