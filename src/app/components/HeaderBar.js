import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const title = this.props.title
    return (
      <View style={[{ width: "100%" }, this.props.style]}>
        <Header
          centerComponent={{ text: title, style: { color: '#fff' } }} />
      </View>
    );
  }
}
