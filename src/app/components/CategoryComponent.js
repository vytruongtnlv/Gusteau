import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FoodCardComponent from './FoodCardComponent';

class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  displayFood(category) {
    return Object.keys(category["dishes"]).map(id => {
      return (
        <FoodCardComponent food={category["dishes"][id]} id={id} />
      )
    })
  }

  render() {
    const category = this.props.category
    return (
      <View style={{
        margin: 10, flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {
          this.displayFood(category)
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {})(CategoryComponent)