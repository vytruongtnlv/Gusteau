import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { retrieveTableList } from '../actions';
import TableFoodComponent from '../components/TableFoodComponent';
import OrderView from './OrderView';
class TableListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'LoadTable'
    }

  }
  componentDidMount() {
    this.retrieveData()
  }

  retrieveData() {
    this.props.retrieveTableList()
  }

  orderHandle() {
    this.props.navigation.navigate('OrderView')
    // this.setState({
    //   view: 'LoadOrder'
    // })
  }

  renderList() {
    const tableList = this.props.tableList
    // if (this.state.view === 'LoadTable')
    return Object.keys(tableList).map(key => {
      return (
        <TouchableOpacity onPress={this.orderHandle.bind(this)}>
          <TableFoodComponent key={key} table={tableList[key]} navigation={this.props.navigation} />
        </TouchableOpacity>
      )
    })
    // else if (this.state.view === 'LoadOrder')
    //   return <OrderView />
  }

  render() {
    const tableList = this.props.tableList
    if (Object.keys(tableList).length === 0)
      return null
    else return (
      <View style={this.props.style}>
        {this.renderList()}
      </View>
    )

  }
}
const mapStateToProps = state => {
  return {
    tableList: state.tableDB.tableList,
  }
}

export default connect(mapStateToProps, { retrieveTableList })(TableListView)