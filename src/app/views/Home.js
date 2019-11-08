import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import TableListView from './TableListView';
import TableStatusView from './TableStatusView';
import { appStyle, styles } from '../style';
import { retrieveCategory, retrieveFoodList, retrievePriceList, retrieveBillList, retrieveMembers } from '../actions';
import { connect } from 'react-redux';
import ScanScreen from './ScanScreen';
class Home extends Component {

  componentDidMount() {
    this.props.retrieveCategory()
    this.props.retrieveBillList();
    this.props.retrieveMembers();
    // this.props.navigation.navigate("Payment")
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        {/* <ScanScreen /> */}
        <TableListView style={[styles.bigContainer]} navigation={this.props.navigation} />
        {/* <TableStatusView style={[styles.rightContainer, appStyle.containerStyle]} navigation={this.props.navigation} /> */}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {

  }
}
export default connect(mapStateToProps, { retrieveMembers, retrieveFoodList, retrievePriceList, retrieveCategory, retrieveBillList })(Home)

