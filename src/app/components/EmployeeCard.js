import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { retrievePermissions, updateData, resetPassword } from '../actions';

class EmployeeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  delete() {
    const { id, item } = this.props
    Alert.alert(
      'Xác nhận',
      `Xoá tài khoản ${item["name"]}`,
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => this.updateData(true) },
      ],
      { cancelable: false },
    );
  }

  updateData(del) {
    const available = del ? false : true;
    const { id, item } = this.props
    const key = `permissions`
    let value = {
      "available": available,
      "name": item["name"],
      "email": item["email"],
      "permission": item["permission"],
      "type": item["type"]
    }
    this.props.updateData({ key, value, id })
    this.props.navigation.navigate("Employees");
  }

  resetPassword(email) {
    const { id, item } = this.props
    Alert.alert(
      'Xác nhận',
      `Đặt lại mật khẩu tài khoản ${item["name"]}`,
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => this.props.resetPassword(email) },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { id, item } = this.props
    return (
      <TouchableOpacity style={{ borderRadius: 5, borderWidth: 1, alignItems: 'center', padding: 5, marginLeft: 5, marginRight: 5, marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ textAlign: 'left' }}>Email:
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>  {item["email"]}</Text>
          </Text>
          <Text style={{ textAlign: 'left' }}>Họ tên:
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>  {item["name"]}</Text>
          </Text>
          <Text style={{ textAlign: 'left' }}>Loại tài khoản:
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>  {item["type"]}</Text>
          </Text>
        </View>
        <View style={{ flexDirection: 'row', width: "15%", alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Icon containerStyle={{ alignItems: 'flex-end' }} name="sync" type="ionicons" onPress={() => this.props.resetPassword(item["email"])} />
          <Icon containerStyle={{ alignItems: 'flex-end' }} name="close" type="ionicons" onPress={() => this.delete()} />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    permissionList: state.auth.permissionList,
  }
}


export default connect(mapStateToProps, { retrievePermissions, updateData, resetPassword })(EmployeeCard)
