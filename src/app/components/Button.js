import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../style';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { title, onPress, style } = this.props
    return (
      <TouchableOpacity
        style={[styles.buttonStyle, style]}
        onPress={onPress}>
        <Text style={{ color: 'black' }}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
