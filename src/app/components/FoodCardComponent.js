import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../style';
import { orderInputChange } from '../actions';
import { connect } from 'react-redux';
class FoodCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _orderInputChange(idFood, idPrice) {
    // console.log(this.props)
    const food = { field: 'idFood', value: idFood }
    const price = { field: 'idPrice', value: idPrice }
    this.props.orderInputChange(food)
    this.props.orderInputChange(price)
    console.log(price)
  }

  render() {
    const { id, food, priceObj } = this.props
    return (
      <TouchableOpacity onPress={() => this._orderInputChange(id, priceObj.idPrice)}>
        <View style={styles.foodStyle}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: food["foodImg"] }} />
          <Text>{food["foodName"]} ${priceObj.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, { orderInputChange })(FoodCardComponent)


