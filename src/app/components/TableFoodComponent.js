import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import tableEmpty from '../../img/tablex128.png'
import tableOrdered from '../../img/servingx128.png'
import tableServed from '../../img/dishx128.png'
import { styles } from '../style';
import { connect } from 'react-redux'
import { currentTable } from '../actions';
class TableFoodComponent extends Component {

  orderHandle() {
    this.props.currentTable(this.props.idTable)
  }

  setImg(status) {
    switch (status) {
      case 'Empty':
        return tableEmpty;
      case 'Ordered':
        return tableOrdered;
      case 'Served':
        return tableServed;
    }
  }
  render() {
    const table = this.props.table
    const tableStatus = table["tableStatus"];
    const img = this.setImg(tableStatus)
    return (
      <TouchableOpacity style={styles.tableStyle} onPress={this.orderHandle.bind(this)}>
        <Image
          source={img} />
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
