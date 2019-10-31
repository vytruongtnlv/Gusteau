import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FoodCardComponent from './FoodCardComponent';
import { currentFood, currentCategory } from '../actions';
import { styles, orderInputStyles } from '../style';
import Modal from 'react-native-modal';
import OrderInputForm from '../views/OrderInputForm';

class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };

  }

  componentDidMount() {
    const id = this.props.id
    this.props.currentCategory({ id })
  }

  toggleModal(id) {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    if (id)
      this.props.currentFood({ id })
    else this.props.currentFood({ id: "" })
  };


  displayFood(category) {
    return Object.keys(category["dishes"]).map(id => {
      return (
        <TouchableOpacity key={id.toString()} onPress={() => this.toggleModal(id)}>
          <FoodCardComponent key={id.toString()} food={category["dishes"][id]} id={id} />
        </TouchableOpacity>
      )
    })
  }

  cancelOrder() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    const category = this.props.category
    return (
      <View>
        <Modal
          style={{ justifyContent: 'center', alignItems: 'center', }}
          isVisible={this.state.isModalVisible}>
          <View style={orderInputStyles.modalInsideStyle}>
            <OrderInputForm callBackFunction={() => this.cancelOrder()} />
          </View>
        </Modal>
        <View style={styles.categoryView}>
          {
            this.displayFood(category)
          }
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, { currentFood, currentCategory })(CategoryComponent)