import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../style';
import { orderInputChange, currentFood, currentCategory } from '../actions';
import { connect } from 'react-redux';
class FoodCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
    // if (this.props.edit == true) {
    //   this.props.currentFood({ id })
    // } else {
    //   this._orderInputChange(id, food.idPrice)
    // }
  }
  render() {
    const { id, food } = this.props
    return (
      <View style={styles.foodStyle}>
        <View style={styles.imgView}>
          <Image
            style={styles.foodImg}
            source={{ uri: food["photos"][0]["value"] }} />
        </View>
        <View style={styles.foodTextView}>
          <Text>{food["name"]} {food["price"]["text"]}</Text>
        </View>
      </View>

    );
  }
}

export default connect(null, { orderInputChange, currentFood, currentCategory })(FoodCardComponent)


