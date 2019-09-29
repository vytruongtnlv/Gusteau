import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import tableEmpty from '../../img/table.png'
import { styles } from '../style';
export default class TableFoodComponent extends Component {
  render() {
    const table = this.props.table
    return (

      <View style={styles.tableStyle}>
        <Image
          source={tableEmpty} />
        <Text>{table["tableName"]}</Text>
      </View>

    );
  }
}

