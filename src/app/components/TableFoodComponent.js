import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import tableEmpty from '../../img/tablex128.png'
import { styles } from '../style';
import { connect } from 'react-redux'
import { currentTable } from '../actions';
class TableFoodComponent extends Component {

  orderHandle() {
    this.props.currentTable(this.props.idTable)
    // this.props.navigation.navigate('OrderView')
  }
  render() {
    const table = this.props.table
    return (
      <TouchableOpacity style={styles.tableStyle} onPress={this.orderHandle.bind(this)}>
        <Image
          source={tableEmpty} />
        <Text>{table["tableName"]}</Text>
      </TouchableOpacity>


    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, { currentTable })(TableFoodComponent)
