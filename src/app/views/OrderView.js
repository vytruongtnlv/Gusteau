import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux'
import { retrieveFoodList, retrievePriceList, retrieveBillList } from '../actions';
import FoodCardComponent from '../components/FoodCardComponent';
import { getFoodPriceByIdFood } from '../logics';
import { appStyle, styles } from '../style';
import FoodListView from './FoodListView';
import OrderInfoView from './OrderInfoView';
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
    foodList: state.foodList.foodList,
    priceList: state.foodList.priceList,
  }
}

export default connect(mapStateToProps, { retrieveFoodList, retrievePriceList, retrieveBillList })(OrderView)


