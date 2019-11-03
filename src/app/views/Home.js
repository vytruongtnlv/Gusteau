import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import TableListView from './TableListView';
import TableStatusView from './TableStatusView';
import { appStyle, styles } from '../style';
import { retrieveCategory, retrieveFoodList, retrievePriceList, retrieveBillList } from '../actions';
import { connect } from 'react-redux';
class Home extends Component {

  componentDidMount() {
    this.props.retrieveCategory()
    this.props.retrieveBillList();

  }
  render() {
    return (
      <View style={styles.mainContainer}>
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
export default connect(mapStateToProps, { retrieveFoodList, retrievePriceList, retrieveCategory, retrieveBillList })(Home)

