import React, { Component } from 'react';
import { View, Text, TouchableOpacity, DeviceEventEmitter, Image } from 'react-native';
import { styles, appStyle, appColor } from '../style';
import Button from '../components/Button';
import { connect } from 'react-redux';
const table = require('../../img/table.png')
const categories = require('../../img/menu.png')
const employee = require('../../img/team.png')
const member = require('../../img/member.png')
class AdminView extends Component {

  render() {
    return (
      <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ padding: 5, marginVertical: 5, borderWidth: 1, borderRadius: 5, width: "30%", height: null, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.props.navigation.navigate("Tables")}>
          <Image source={table} />
          <Text>Bàn ăn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5, marginVertical: 5, borderWidth: 1, borderRadius: 5, width: "30%", height: null, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.props.navigation.navigate("Categories")}>
          <Image source={categories} />
          <Text>Thực đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5, marginVertical: 5, borderWidth: 1, borderRadius: 5, width: "30%", height: null, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.props.navigation.navigate("Employees")}>
          <Image source={employee} />
          <Text>Nhân viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5, marginVertical: 5, borderWidth: 1, borderRadius: 5, width: "30%", height: null, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.props.navigation.navigate("Members")}>
          <Image source={member} />
          <Text>Khách hàng</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(AdminView)