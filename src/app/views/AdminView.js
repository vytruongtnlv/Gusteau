import React, { Component } from 'react';
import { View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { styles, appStyle } from '../style';
import Button from '../components/Button';
import { billAnalyzer } from '../logics';
import ChartComponents from '../components/ChartComponents';
import { connect } from 'react-redux';
import FoodInputForm from './FoodInputForm';
import BillStatistic from './BillStatistic';
const STATISTIC = "Statistic";
const FOOD = "Food";
const TABLE = "Table"
class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: STATISTIC
    };
  }

  switchView(value) {
    this.setState({ view: value })

  }

  handleFoodInPut() {
    return (
      <FoodInputForm />
    )
  }

  displayLeftView() {
    switch (this.state.view) {
      case STATISTIC: const data = billAnalyzer('day');
        if (data)
          return (
            // <BillStatistic />
            <ChartComponents data={data} style={{ width: "100%", height: "100%" }} />
          )
        return null
      case FOOD:
        return <FoodInputForm style={{ width: "100%", height: "100%" }} />
    }
  }

  render() {
    return (
      <View style={[styles.mainContainer]}>
        <View style={[styles.leftContainer, appStyle.containerStyle, { width: "88%" }]} >
          {this.displayLeftView()}
        </View>
        <View style={[styles.rightContainer, appStyle.containerStyle, { width: "12%", alignItems: 'center', justifyContent: 'space-around' }]} >
          <Button title="Statistic" onPress={() => this.switchView(STATISTIC)} />
          <Button title="Food" onPress={() => this.switchView(FOOD)} />
          <Button title="Table" onPress={() => this.switchView(Table)} />
          <Button title="Employee" onPress={() => this.switchView("Employee")} />
        </View>
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
    bill: state.orders.bill
  }
}

export default connect(mapStateToProps)(AdminView)