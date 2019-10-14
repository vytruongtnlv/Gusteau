import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux'
import { retrieveFoodList, retrievePriceList } from '../actions';
import FoodCardComponent from '../components/FoodCardComponent';
import { getFoodPriceByIdFood } from '../logics';
import { styles, appStyle } from '../style';
class FoodListView extends Component {

  componentDidMount = async () => {
    this.props.retrieveFoodList()
    this.props.retrievePriceList()
    // console.log('------****', priceObj)
    // this.props.storeFoodList(priceObj)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (JSON.stringify(this.props) != JSON.stringify(nextProps))
  //     // getFoodPriceByIdFood()
  // }

  renderList() {
    if (Object.keys(this.props.foodList).length > 0)
      return Object.keys(this.props.foodList).map(id => {
        return <FoodCardComponent id={id} food={this.props.foodList[id]} />
      })
    else return null;
  }

  render() {
    return (
      <View style={[styles.leftContainer, appStyle.containerStyle]}>
        {this.renderList()}
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

export default connect(mapStateToProps, { retrieveFoodList, retrievePriceList })(FoodListView)


