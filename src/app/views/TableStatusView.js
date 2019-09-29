import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TableStatusView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text> TableStatusView </Text>
      </View>
    );
  }
}
