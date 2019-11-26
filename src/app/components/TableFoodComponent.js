import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import tableEmpty from '../../img/tablex128.png'
import tableOrdered from '../../img/servingx128.png'
import tableServed from '../../img/dishx128.png'
import { styles, appColor } from '../style';
import { connect } from 'react-redux'
import { currentTable } from '../actions';
const empty = "Trống";
const ordered = "Đã gọi món";
const tableimg = require('../../img/tablex128.png')

class TableFoodComponent extends Component {

  async orderHandle() {
    await this.props.currentTable(this.props.idTable)
    this.props.navigation.navigate('OrderTab')
  }

  setImg(status) {
    switch (status) {
      case empty:
        return appColor.green;
      case ordered:
        return appColor.red;
      case 'Served':
        return tableServed;
    }
  }
  render() {
    const table = this.props.table
    const tableStatus = table["tableStatus"];
    const img = this.setImg(tableStatus)
    return (
      // <View style={[styles.tableStyle, { backgroundColor: img, }]} >
      //    <Text style={styles.tableText}>{table["tableName"]}</Text>
      //   <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', width: "100%", 
      //   padding: 10, justifyContent: 'space-between', }}>
      <TouchableOpacity onPress={this.orderHandle.bind(this)} style={[styles.tableStyle, { backgroundColor: img }]} >
        <Image source={tableimg} />
        <Text style={styles.tableText}>{table["tableName"]}</Text>
      </TouchableOpacity >
      // TouchableOpacity><Text style={styles.tableText}>Thanh toán</Text></TouchableOpacity>
      // </View> 
      // </View>


    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, { currentTable })(TableFoodComponent)
