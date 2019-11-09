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
    const title = (this.props.title).toUpperCase();
    return (
      <View style={{
        backgroundColor: '#3D6DCC',
        width: "100%", height: "7.5%",
        justifyContent: 'center', alignItems: 'center', marginBottom: "2.5%"
      }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{title}</Text>
      </View>
    )
  }
}

