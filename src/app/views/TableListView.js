import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Input } from 'react-native-elements'
import firebase from 'firebase'
import config from '../config';
import { connect } from 'react-redux'
import { retrieveTableList } from '../actions';
import TableFoodComponent from '../components/TableFoodComponent';
class TableListView extends Component {

  componentDidMount() {
    this.retrieveData()
  }

  retrieveData() {
    this.props.retrieveTableList()
  }

  renderList() {
    const tableList = this.props.tableList
    return Object.keys(tableList).map(key => {
      return <TableFoodComponent table={tableList[key]} />
    })
  }

  render() {
    const tableList = this.props.tableList
    if (Object.keys(tableList).length === 0)
      return null
    else {
      return (
        <View>
          {this.renderList()}
        </View>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    tableList: state.tableDB.tableList,
  }
}

export default connect(mapStateToProps, { retrieveTableList })(TableListView)