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
  navigateToScanner() {
    this.props.navigation.navigate('ScanScreen')
    // this.props.navigation.navigate('Scanner')
  }
  navigateToCreate() {
    this.props.navigation.navigate('CustomerView')
  }

  render() {
    return (
      <View>
        <Text> Profile </Text>
        <Button title="Quét mã QR" onPress={() => this.navigateToScanner()} />
        <Button title="Tạo khách hàng mới" onPress={() => this.navigateToCreate()} />
        <Button title="Quản trị" onPress={() => this.navigateToAdminTab()} />
      </View>
    );
  }
}
