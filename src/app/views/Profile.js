import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { connect } from 'react-redux';
import { appStyle } from '../style';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.user = this.props.user
    this.uid = this.user.user.uid
    this.account = {}
    this.permission = "none";
  }

  componentDidMount() {
    this.getPermission()
  }

  getPermission() {
    const list = this.props.permissionList;
    this.account = list[this.uid]
    const upermission = this.account["permission"]
    this.permission = upermission
  }

  navigateToAdminTab() {
    this.props.navigation.navigate('AdminTabs')
  }
  navigateToScanner() {
    this.props.navigation.navigate('ScanScreen')
    // this.props.navigation.navigate('Scanner')
  }
  navigateToCreate() {
    this.props.navigation.navigate('QrCreator')
  }

  render() {
    this.getPermission()
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderBar title="Thông tin cá nhân" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 16 }}>Tài khoản:</Text>
          <Text style={{ fontSize: 16 }}>{this.user.user.email}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 16 }}>Họ và tên:</Text>
          <Text style={{ fontSize: 16 }}>{this.account["name"]}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 16 }}>Loại tài khoản:</Text>
          <Text style={{ fontSize: 16 }}>{this.account["type"]}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5%' }}>
          <Button title="Quét mã QR" onPress={() => this.navigateToScanner()} />

          <Button title="Tạo khách hàng mới" onPress={() => this.navigateToCreate()} />
          {this.permission == "all"
            &&
            <Button title="Quản trị" onPress={() => this.navigateToAdminTab()} />
          }
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    permissionList: state.auth.permissionList,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {})(Profile)
