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
    const { title, onPress } = this.props
    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }
}
