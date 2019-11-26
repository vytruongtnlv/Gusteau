import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import TableListView from './TableListView';
import TableStatusView from './TableStatusView';
import { appStyle, styles } from '../style';
import { retrieveCategory, retrieveBillList, retrieveMembers } from '../actions';
import { connect } from 'react-redux';
class Home extends Component {

  componentDidMount() {
    this.props.retrieveCategory()
    this.props.retrieveBillList();
    this.props.retrieveMembers();
  }
  render() {
    if (global.permission == "all") return this.props.navigation.navigate("AdminTabs")
    return (
      <View style={styles.mainContainer}>
        <TableListView style={[styles.bigContainer]} navigation={this.props.navigation} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {

  }
}
export default connect(mapStateToProps, { retrieveMembers, retrieveCategory, retrieveBillList })(Home)

