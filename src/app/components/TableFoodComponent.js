import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';

export default class TableFoodComponent extends Component {
  render() {
    const table = this.props.table
    console.log('--->', table)
    if (table["tableExist"] === "True")
      return (
        <View style={styles.tableContainer}>
          <TouchableHighlight>
            <Text>{table["tableName"]}</Text>
          </TouchableHighlight>
        </View>
      );
    else return null
  }
}

const styles = StyleSheet.create({
  tableContainer: {
    width: '10%',
    height: 50
  }
})
