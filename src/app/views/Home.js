import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import TableListView from './TableListView';
import TableStatusView from './TableStatusView';
import { appStyle, styles } from '../style';
class Home extends Component {

  render() {
    return (
      <View style={styles.mainContainer}>
        <TableListView style={[styles.leftContainer, appStyle.containerStyle]} navigation={this.props.navigation} />
        <TableStatusView style={[styles.rightContainer, appStyle.containerStyle]} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default (Home)

