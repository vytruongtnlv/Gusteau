import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import TableListView from './TableListView';
import TableStatusView from './TableStatusView';
import { appStyle, styles } from '../style';
import { retrieveCategory, retrieveFoodList, retrievePriceList } from '../actions';
import { connect } from 'react-redux';
class Home extends Component {

  componentDidMount() {
    this.props.retrieveCategory()
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
export default connect(mapStateToProps, { retrieveFoodList, retrievePriceList, retrieveCategory })(Home)

