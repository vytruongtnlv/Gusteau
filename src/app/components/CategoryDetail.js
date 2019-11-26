import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Button from './Button';
import { connect } from 'react-redux';
import { updateData, retrieveCategory } from '../actions';
import { Input, Icon } from 'react-native-elements';
import { setConst } from '../config';
import FoodDetail from './FoodDetail';
import HeaderBar from './HeaderBar';
class CategoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish_type_name: "",
      dishes: {},
      rerender: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ rerender: !this.state.rerender });
    });
    const { params } = navigation.state
    if (params && !params["create"]) {
      const { key, category } = params
      this.setState({
        dish_type_name: category["dish_type_name"],
        dishes: category["dishes"]
      })
    }
  }
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

  resetField() {
    const { params } = this.props.navigation.state
    const { key, category } = params
    this.setState({
      dish_type_name: category["dish_type_name"],
    })
  }

  delete(id) {
    const { dish_type_name } = this.state
    Alert.alert(
      'Xác nhận',
      `Xoá ${dish_type_name}`,
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => this.categoryHandle(id, true) },
      ],
      { cancelable: false },
    );
  }

  categoryHandle(id, del) {
    const available = del ? false : true;
    const key = `category`
    const { dish_type_name, dishes } = this.state
    if (dish_type_name != "") {
      const value = {
        available: available,
        dish_type_name: dish_type_name,
        dishes: dishes ? dishes : {}
      }
      id ? this.props.updateData({ key, value, id }) : this.props.updateData({ key, value })
      this.props.navigation.navigate("Categories");
    }
    else {
      alert("Vui lòng điền đủ thông tin!")
    }
  }

  displayFood() {
    const { key, category } = this.props.navigation.state.params
    const idCategory = key;
    if (category["dishes"])
      return Object.keys(category["dishes"]).map(key => {
        return (
          <FoodDetail idCategory={idCategory} id={key} key={key} food={category["dishes"][key]} navigation={this.props.navigation} />
        )
      })
  }

  render() {
    const { params } = this.props.navigation.state
    if (params && params["create"]) return (
      <View>
        <Text>Tên loại</Text>
        <Input
          placeholder="Tên loại"
          onChangeText={text => this.setState({ dish_type_name: text })} />
        <View style={{ justifyContent: 'space-around', marginTop: 5, flexDirection: 'row' }}>
          <Button title="Thêm"
            onPress={() => this.categoryHandle()}
            icon={<Icon name="add" type="ionicons" />} />
          <Button title="Quay về"
            onPress={() => this.props.navigation.goBack()}
            icon={<Icon name="arrow-back" type="ionicons" />} />
        </View>
      </View>
    )
    else {
      const { key, category } = params
      const isempty = category["dishes"] && Object.keys(category["dishes"])[0] ? false : true;
      return (
        <View style={{ width: "100%", height: "100%" }}>
          <HeaderBar label={this.state.dish_type_name} navigation={this.props.navigation} rightComponent={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("FoodInputForm", { create: true, key, category })}>
              <Icon name='add' type="ionicons" />
            </TouchableOpacity>} />
          {
            this.state.edit &&
            <View>
              <Input
                value={this.state.dish_type_name}
                onChangeText={text => this.setState({ dish_type_name: text })} />
            </View>
          }
          <ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}>
            {this.displayFood()}
            <View style={{ marginVertical: 10, justifyContent: 'space-around', width: "100%", flexDirection: 'row' }}>
              {!this.state.edit &&
                <Button
                  title="Sửa"
                  icon={<Icon name="create" type="ionicons" />}
                  onPress={() => this.setState({ edit: true })} />

              }
              {!this.state.edit &&
                <Button
                  title="Xoá"
                  icon={<Icon name="trash" type="font-awesome" />}
                  onPress={() => this.delete(key)} />
              }
              {this.state.edit &&
                <Button title="Lưu"
                  icon={<Icon name="check" type="font-awesome" />}
                  onPress={() => this.categoryHandle(key)} />
              }
              {this.state.edit &&
                <Button
                  title="Huỷ"
                  icon={<Icon name="close" type="ionicons" />}
                  onPress={() => this.resetField()} />}
              <Button
                title="Quay về"
                icon={<Icon name="arrow-back" type="ionicons" />}
                onPress={() => this.props.navigation.goBack()} />
            </View>
          </ScrollView>

        </View>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    category: state.category.categoryList,
  }
}


export default connect(mapStateToProps, { updateData, retrieveCategory })(CategoryDetail)