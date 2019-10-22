import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux'
import { retrieveBillList } from '../actions';
import FoodCardComponent from '../components/FoodCardComponent';
import { getFoodPriceByIdFood } from '../logics';
import { appStyle, styles } from '../style';
import FoodListView from './FoodListView';
import OrderInfoView from './OrderInfoView';
class OrderView extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <FoodListView style={[styles.leftContainer, appStyle.containerStyle]} navigation={this.props.navigation} />
        <OrderInfoView style={[styles.rightContainer, appStyle.containerStyle]} navigation={this.props.navigation} />
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

export default connect(mapStateToProps, { retrieveBillList })(OrderView)


