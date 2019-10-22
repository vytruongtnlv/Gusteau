import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux'
import FoodCardComponent from '../components/FoodCardComponent';
import { getFoodPriceByIdFood } from '../logics';
import { styles, appStyle } from '../style';
class FoodListView extends Component {

  componentDidMount = async () => {
  }

  renderList() {
    if (Object.keys(this.props.category).length > 0) {
      return Object.keys(this.props.category).map(id => {
        <Text>{id}</Text>
        //   return <FoodCardComponent edit={this.props.edit} food={this.props.foodList[id]} id={id} key={id} />
      })
    }
    else return null;
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.renderList()}
      </View>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    foodList: state.foodList.foodList,
    priceList: state.foodList.priceList,
    category: state.category.categoryList,
  }
}

export default connect(mapStateToProps, {})(FoodListView)


