import React, { Component } from 'react';
import { StyleSheet, View, Text, Picker, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { retrieveFoodList, retrievePriceList } from '../actions';
import FoodCardComponent from '../components/FoodCardComponent';
import { getFoodPriceByIdFood } from '../logics';
import { styles, appStyle } from '../style';
import CategoryComponent from '../components/CategoryComponent';
class FoodListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      selectedCategory: ""
    };
  }
  componentDidMount = async () => {
    const data = this.props.category;
    const list = this.getCategoryList(data)
    await this.setState({
      categoryList: list,
      selectedCategory: list[0] ? list[0]["props"]["value"] : ""
    })

  }

  getCategoryList(data) {
    let list = [];
    Object.keys(data).forEach(key => {
      list.push(<Picker.Item key={key.toString()} label={data[key]["dish_type_name"]} value={key} />)
    })
    return list
  }

  renderList(data) {
    if (this.state.selectedCategory != "")
      return (
        <CategoryComponent id={this.state.selectedCategory} key={this.state.selectedCategory.toString()} category={data[this.state.selectedCategory]} />
      )
    else return Object.keys(data).map(key => {
      return (
        <CategoryComponent key={key.toString()} id={key} category={data[key]} />
      )
    })
  }

  render() {
    const data = this.props.category;
    return (
      <View style={[this.props.style,]}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Picker
            selectedValue={this.state.selectedCategory}
            onValueChange={(selected) => this.setState({ selectedCategory: selected })}>
            {this.state.categoryList}
          </Picker>
          {this.renderList(data)}
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

export default connect(mapStateToProps, { retrieveFoodList, retrievePriceList })(FoodListView)


