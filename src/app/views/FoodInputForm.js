import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { foodInputChange, createFood, updateData } from '../actions';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';

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
    };
  }

  printData() {
    const { name, img, idCategory, price } = this.props
    var key = 'food';
    var value = {
      available: 'True',
      foodImg: img,
      foodName: name,
      idCategory: idCategory
    }
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

  render() {
    return (
      <View>
        <Input
          placeholder="name"
          onChangeText={text => this.props.foodInputChange({ field: 'name', value: 'food 1' })} />
        <Input
          placeholder="idCategory"
          onChangeText={text => this.props.foodInputChange({ field: 'idCategory', value: 'ct01' })} />
        <Input
          placeholder="price"
          onChangeText={text => this.props.foodInputChange({ field: 'price', value: '3.5' })} />
        <Button title='Choose' onPress={this.displayAlbumn.bind(this)} />
        {/* <Image source={{ uri: this.props.img }} /> */}
        <Button title='Display' onPress={this.printData.bind(this)} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.foodList.name,
    img: state.foodList.img,
    idCategory: state.foodList.idCategory,
    price: state.foodList.price
  }
}

export default connect(mapStateToProps, { foodInputChange, createFood })(FoodInputForm)
