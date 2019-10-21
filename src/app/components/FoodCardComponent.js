import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../style';
import { orderInputChange, currentFood, currentCategory } from '../actions';
import { connect } from 'react-redux';
class FoodCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _orderInputChange(idFood, idPrice) {
    const food = { field: 'idFood', value: idFood }
    const price = { field: 'idPrice', value: idPrice }
    this.props.orderInputChange(food)
    this.props.orderInputChange(price)
  }

  foodOnPress() {
    const { id, food } = this.props
    this.props.currentCategory({ id })
    if (this.props.edit == true) {
      this.props.currentFood({ id })
    } else {
      this._orderInputChange(id, food.idPrice)
    }
  }

  render() {
    const { id, food } = this.props
    const priceKey = Object.keys(food["price"])
    return (
      <TouchableOpacity onPress={this.foodOnPress.bind(this)}>
        <View style={styles.foodStyle}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: food["foodImg"] }} />
          <Text>{food["foodName"]} ${food["price"][priceKey]["price"]}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, { orderInputChange, currentFood, currentCategory })(FoodCardComponent)


