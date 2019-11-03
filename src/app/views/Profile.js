import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import AdminTabs from '../../../AdminTabs';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigateToAdminTab() {
    this.props.navigation.navigate('AdminTabs')
  }

  render() {
    return (
      <View>
        <Text> Profile </Text>
        <Button title="Admin" onPress={() => this.navigateToAdminTab()} />
      </View>
    );
  }
}
