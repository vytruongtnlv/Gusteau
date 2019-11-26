import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { Icon } from 'react-native-elements';
import { retrieveCategory } from '../actions';
class CategoryManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.retrieveCategory()
    });
  }


  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

  getCategoryList() {
    const data = this.props.category
    return Object.keys(data).map(key => {
      return (
        <TouchableOpacity
          style={{
            padding: 5, marginLeft: 5, marginRight: 5, marginVertical: 5,
            height: 50, borderRadius: 5, borderWidth: 1, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
          }}
          onLongPress={() => this.props.navigation.navigate("CategoryDetail", { key: key, category: data[key] })}>
          <Text style={{ fontSize: 14 }}>{data[key]["dish_type_name"]}</Text>
          <Icon name="create" type="ionicons"
            onPress={() => this.props.navigation.navigate("CategoryDetail",
              { key: key, category: data[key] })}
          />
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderBar label="Quản lý thực đơn" navigation={this.props.navigation} rightComponent={
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CategoryDetail", { create: true })}>
            <Icon name='add' type="ionicons" />
          </TouchableOpacity>} />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}>
          {this.getCategoryList()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category.categoryList,
  }
}


export default connect(mapStateToProps, { retrieveCategory })(CategoryManagement)

