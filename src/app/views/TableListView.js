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
    }

  }
  componentDidMount() {
    this.retrieveData()
  }

  retrieveData() {
    this.props.retrieveTableList()
  }



  renderList() {
    const tableList = this.props.tableList
    return Object.keys(tableList).map(key => {
      return (
        <TableFoodComponent key={key} idTable={key} table={tableList[key]} navigation={this.props.navigation} />
      )
    })
  }

  render() {
    const tableList = this.props.tableList
    return Object.keys(tableList).map(key => {
      return (
        <TableFoodComponent key={key} idTable={key} table={tableList[key]} navigation={this.props.navigation} />
      )
    })
  }
}
const mapStateToProps = state => {
  return {
    tableList: state.tableDB.tableList,
  }
}

export default connect(mapStateToProps, { retrieveTableList })(TableListView)