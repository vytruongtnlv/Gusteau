import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Input } from 'react-native-elements'
import { foodInputChange, createFood, updateData, currentFood } from '../actions';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import Button from '../components/Button';
import FoodListView from './FoodListView';
import { appStyle, styles } from '../style';
import { setFoodPrice } from '../logics';

const options = {
  title: 'Select Food Image',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Albumn' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class FoodInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: '',
      cate: "c01",
      price: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idFood != prevProps.idFood && this.state.foodName == prevState.foodName) {
      const key = Object.keys(this.props.foodList[this.props.idFood]["price"])
      const price = this.props.foodList[this.props.idFood]["price"][key]["price"]
      this.setState({
        price: price,
        foodName: this.props.foodList[this.props.idFood]["foodName"],
      })
      alert(price)
    }
  }

  async updateFood() {
    const { name, img, idCategory, price } = this.props
    const id = this.props.idFood
    var key = 'food';

    var value = {
      available: true,
      foodImg: img,
      foodName: name,
      idCategory: "c01",
    }
    if (this.props.idFood != "") {
      this.props.updateData({ key, value, id });
    }
    else {
      await this.props.updateData({ key, value });
      this.updateFoodPrice(id, price)
    }
  }

  createFood() {
    if (this.props.idFood != "") {
      const id = ""
      this.props.currentFood({ id });
    }

  }

  updateFoodPrice(idFood, price) {
    const id = this.props.idItem
    const { key, value } = setFoodPrice(id, price)
    this.props.updateData({ key, value })
  }

  displayAlbumn() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.props.foodInputChange({ field: 'img', value: source["uri"] })
      }
    });
  }

  changeField(field, text) {
    if (field == 'name') this.setState({ foodName: text })
    if (field == 'price') this.setState({ price: text })
    this.props.foodInputChange({ field: field, value: text })
  }

  displayInputForm() {
    const name = this.props.currentFood == "" ? "Create" : "Save"
    const { foodName, price } = this.state
    return (
      <View style={{ position: "absolute", right: 10, justifyContent: 'center', width: "50%", height: "50%" }}>
        {/* {this.props.idFood != "" && */}
        <Text style={{ fontSize: 25, marginLeft: 20, color: 'gray' }}>ID {this.props.idFood}</Text>
        {/* } */}
        <Input
          placeholder="name"
          value={foodName}
          onChangeText={foodName => this.changeField('name', foodName)} />
        {/* <Input
          placeholder="idCategory"
          onChangeText={text => this.props.foodInputChange({ field: 'idCategory', value: text })} />
        */}<Input
          placeholder="price"
          value={price}
          onChangeText={price => this.changeField('price', parseFloat(price))} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20 }}>
          <Button style={{ margin: 20 }} title='Choose' onPress={this.displayAlbumn.bind(this)} />
          <Image source={{ uri: this.props.img }} />
          <Button style={{ margin: 20 }} title={"Add new"} onPress={this.updateFood.bind(this)} />
          {/* {this.props.idFood != "" &&
            <Button style={{ margin: 20 }} title='Edit' onPress={this.updateFood.bind(this)} />
          } */}
        </View>

      </View>
    );
  }

  diplayFoodList() {
    return (
      <FoodListView edit={true} style={[styles.smallLeft]} navigation={this.props.navigation} />
    )
  }

  render() {
    return (
      <View style={this.props.style}>
        <FoodListView edit={true} style={[styles.smallLeft]} navigation={this.props.navigation} />
        {this.displayInputForm()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.foodList.name,
    img: state.foodList.img,
    idCategory: state.foodList.idCategory,
    price: state.foodList.price,
    idFood: state.orders.currentFood,
    foodList: state.foodList.foodList,
    idItem: state.other.idItem
  }
}

export default connect(mapStateToProps, { currentFood, foodInputChange, createFood, updateData })(FoodInputForm)
