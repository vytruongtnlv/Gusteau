import React, { Component } from 'react';
import { View, Text } from 'react-native';

class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  displayFoodByCategory(idCategory) {
    const food = this.props.category[idCategory]["food"]
    if (Object.keys(food).length > 0) {
      return Object.keys(food).map(id => {
        return <FoodCardComponent edit={this.props.edit} food={food[id]} id={id} key={id} />
      })
    }
  }

  render() {
    return (
      <View>

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

export default connect(mapStateToProps, {})(CategoryComponent)