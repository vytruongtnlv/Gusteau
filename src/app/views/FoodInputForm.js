import React, { Component } from 'react';
import { View, Text, Image, Picker, TextInput } from 'react-native';
import { Input, Icon } from 'react-native-elements'
import { createFood, updateData, currentFood } from '../actions';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import Button from '../components/Button';
import FoodListView from './FoodListView';
import { appStyle, styles } from '../style';
import { setFoodPrice } from '../logics';

const options = {
  title: 'Chọn hình cho món',
  customButtons: [{ name: 'fb', title: 'Chọn ảnh' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
let oldCategory = "";
class FoodInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      idCategory: "",
      foodName: '',
      cate: "c01",
      price: 0,
      name: "",
      description: "",
      photos: [],
      price: 0,
      edit: false,
      category: {},
      categoryList: [],
      selectedCategory: ""
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    if (params && !params["create"]) {
      this.resetField();
    }
    else if (params && params["create"]) {
      this.resetCreate();
    }
  }

  resetCreate() {
    const { params } = this.props.navigation.state
    const { key, category } = params
    const data = this.props.category;
    const list = this.getCategoryList(data)
    oldCategory = key;
    this.setState({
      categoryList: list,
      idCategory: key,
      selectedCategory: key
    })
    this.initPhotos();
    // this.initPrice();
  }

  resetField() {
    const { params } = this.props.navigation.state
    const { id, idCategory, food } = params
    const data = this.props.category;
    const list = this.getCategoryList(data)
    oldCategory = idCategory
    this.setState({
      categoryList: list,
      id: id,
      idCategory: idCategory,
      name: food["name"],
      description: food["description"],
      photos: food["photos"],
      price: food["price"]["value"],
    })
  }

  initPhotos() {
    let photos = [{
      height: 120,
      value: "",
      width: 120
    }]
    this.setState({ photos })
  }

  delete(id) {
    const { name } = this.state
    Alert.alert(
      'Xác nhận',
      `Xoá ${name}`,
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => this.updateData(id, true) },
      ],
      { cancelable: false },
    );
  }

  updateData(id, del) {
    const { name, description, price, photos } = this.state
    const idCategory = this.state.idCategory
    const key = `category/${idCategory}/dishes`
    if (name != "" && price != "") {
      const value = {
        description: description,
        is_available: del ? false : true,
        name: name,
        photos: photos,
        price: {
          "text": "10, 000đ",
          "unit": "đ",
          "value": parseInt(price)
        }
      }
      setTimeout(() => {
        id ? this.props.updateData({ key, value, id }) : this.props.updateData({ key, value })
      }, 1500)
      if (oldCategory == idCategory)
        this.props.navigation.navigate("CategoryDetail");
      else
        this.props.navigation.navigate("Categories")
    }
    else {
      alert("Vui lòng điền đủ thông tin!")
    }
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
        this.setState({
          photos: {
            ...this.state.photos,
            [0]: {
              ...this.state.photos[0],
              value: source["uri"]
            }
          }
        })
      }
    });
  }

  getCategoryList(data) {
    let list = [];
    Object.keys(data).forEach(key => {
      list.push(<Picker.Item key={key.toString()} label={data[key]["dish_type_name"]} value={key} />)
    })
    return list
  }

  onPriceChange(text) {
    let price = text
    this.setState({
      price: price
    })
  }
  displayInputForm() {
    const { name, description, price, photos, idCategory } = this.state
    const { key, category } = this.props.navigation.state.params
    return (
      <View>
        <Input
          label="Tên món"
          value={name}
          errorStyle={{ color: 'red' }}
          errorMessage={price == "" ? 'Đừng để trống' : ''}
          onChangeText={text => this.setState({ name: text })} />
        <Input
          label="Miêu tả"
          value={description}
          onChangeText={text => this.setState({ description: text })} />
        <Picker
          selectedValue={idCategory}
          onValueChange={(selected) => this.setState({ idCategory: selected })}>
          {this.state.categoryList}
        </Picker>
        {/* {
          price && price["value"] && */}
        <Input
          label="Giá tiền"
          keyboardType="number-pad"
          errorStyle={{ color: 'red' }}
          errorMessage={price == "" ? 'Đừng để trống' : ''}
          value={price.toString()}
          onChangeText={text => this.onPriceChange(text)} />
        {/* } */}

        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20 }}>
          <View style={{ width: "45%", justifyContent: 'center', alignItems: 'center', }}>
            {photos[0] && (photos[0]["value"] != "") &&
              <Button
                title="Tải ảnh"
                icon={<Icon name="image" type="font-awesome" />}
                onPress={this.displayAlbumn.bind(this)} />
            }
          </View>
          <View style={{ width: "45%" }}>
            {photos[0] && (photos[0]["value"] != "") &&
              < Image
                style={styles.foodImg}
                source={{ uri: photos[0]["value"] }} />
            }

          </View>
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
    const { id, name, description, price, photos, edit, idCategory } = this.state
    const { params } = this.props.navigation.state
    if (params && params["create"]) return (
      <View>
        {this.displayInputForm()}
        <View style={{ marginVertical: 10, justifyContent: 'space-around', width: "100%", flexDirection: 'row' }}>
          <Button
            title="Lưu"
            icon={<Icon name="check" type="font-awesome" />}
            onPress={() => this.updateData()} />
          <Button title="Huỷ bỏ"
            icon={<Icon name="close" type="ionicons" />}
            onPress={() => this.resetCreate()}
          />
          <Button
            title="Quay về"
            icon={<Icon name="arrow-back" type="ionicons" />}
            onPress={() => this.props.navigation.goBack()} />
        </View>

      </View>
    )
    else if (params && !params["create"])
      return (
        <View style={[this.props.style, { width: "100%" }]}>

          <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            <View style={{ width: "50%", padding: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
              {photos[0] &&
                <Image
                  style={styles.foodImg}
                  source={{ uri: photos[0]["value"] }} />
              }
            </View>
            <View style={{ width: "50%", padding: 10, justifyContent: 'center', alignItems: 'flex-end', paddingRight: "10%" }}>
              {edit &&
                <Button
                  title="Tải ảnh"
                  icon={<Icon name="image" type="font-awesome" />}
                  onPress={this.displayAlbumn.bind(this)} />
              }
            </View>

          </View>
          {!edit &&
            <View style={{ width: "100%", paddingLeft: 5 }}>
              <Text style={{ fontSize: 17, color: "#919aa3", fontWeight: 'bold' }}>Tên món</Text>
              <Text style={{ fontSize: 20 }}>{name}</Text>
              <Text style={{ fontSize: 17, color: "#919aa3", fontWeight: 'bold' }}>Miêu tả</Text>
              <Text style={{ fontSize: 20 }}>{description != "" ? description : "Chưa có"}</Text>
              <Text style={{ fontSize: 17, color: "#919aa3", fontWeight: 'bold' }}>Danh mục</Text>
              <Text style={{ fontSize: 20 }}>{idCategory ? this.props.category[idCategory]["dish_type_name"] : ""}</Text>
              <Text style={{ fontSize: 17, color: "#919aa3", fontWeight: 'bold' }}>Giá tiền</Text>
              <Text style={{ fontSize: 20 }}>{price}đ</Text>
            </View>
          }
          {edit &&
            <View>
              <Input
                label="Tên món"
                errorStyle={{ color: 'red' }}
                errorMessage={price == "" ? 'Đừng để trống' : ''}
                value={name}
                onChangeText={text => this.setState({ name: text })} />
              <Input
                label="Miêu tả"
                value={description}
                onChangeText={text => this.setState({ description: text })} />
              <Picker
                selectedValue={idCategory}
                onValueChange={(selected) => this.setState({ idCategory: selected })}>
                {this.state.categoryList}
              </Picker>
              <Input
                label="Giá tiền"
                errorStyle={{ color: 'red' }}
                errorMessage={price == "" ? 'Đừng để trống' : ''}
                keyboardType="number-pad"
                value={price.toString()}
                onChangeText={text => this.onPriceChange(text)} />
            </View>
          }

          {!edit &&
            <View style={{ marginVertical: 10, justifyContent: 'space-around', width: "100%", flexDirection: 'row' }}>
              <Button title="Sửa"
                icon={<Icon name="create" type="ionicons" />}
                onPress={() => this.setState({ edit: true })} />
              <Button
                icon={<Icon name="trash" type="font-awesome" />}
                onPress={() => this.delete(id)}
                title="Xoá"
              />
              <Button
                title="Quay về"
                icon={<Icon name="arrow-back" type="ionicons" />}
                onPress={() => this.props.navigation.goBack()} />
            </View>

          }
          {
            edit &&
            <View style={{ marginVertical: 10, justifyContent: 'space-around', width: "100%", flexDirection: 'row' }}>
              <Button
                title="Lưu"
                icon={<Icon name="check" type="font-awesome" />}
                onPress={() => this.updateData(id)} />
              <Button
                title="Huỷ bỏ"
                onPress={() => this.resetField()}
                icon={<Icon name="close" type="ionicons" />} />
              <Button
                title="Quay về"
                icon={<Icon name="arrow-back" type="ionicons" />}
                onPress={() => this.props.navigation.goBack()} />
            </View>
          }
        </View>
      );
  }
}

const mapStateToProps = state => {
  return {
    category: state.category.categoryList,
  }
}

export default connect(mapStateToProps, { currentFood, createFood, updateData })(FoodInputForm)
