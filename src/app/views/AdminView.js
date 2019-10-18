import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, appStyle } from '../style';
import Button from '../components/Button';

export default class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  buttonMenu = (name, callBack) => {
    return (
      <TouchableOpacity
        onPress={() => callBack(name)}
        style={{
          width: 100, height: 100, backgroundColor: 'gray',
          justifyContent: 'center', alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text>{name}</Text>
      </TouchableOpacity>
    )
  }

  dataAnalyzer(name) {
    alert(name)
  }

  render() {
    return (
      <View style={[styles.mainContainer]}>
        <View style={[styles.leftContainer, appStyle.containerStyle, { width: "88%" }]} >
        </View>
        <View style={[styles.rightContainer, appStyle.containerStyle, { width: "12%", alignItems: 'center', justifyContent: 'space-around' }]} >
          <Button tittle="Statistic" onPress={() => this.dataAnalyzer("Statistic")} />
          <Button tittle="Food" onPress={() => this.dataAnalyzer("Food")} />
          <Button tittle="Table" onPress={() => this.dataAnalyzer("Table")} />
          <Button tittle="Employee" onPress={() => this.dataAnalyzer("Employee")} />
          {/* {this.buttonMenu("Food", this.dataAnalyzer)}
          {this.buttonMenu("Table", this.dataAnalyzer)}
          {this.buttonMenu("Employee", this.dataAnalyzer)} */}
        </View>
      </View >
    );
  }
}
