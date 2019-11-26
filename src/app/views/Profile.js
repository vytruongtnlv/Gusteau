import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { connect } from 'react-redux';
import { appStyle } from '../style';
import { Icon, Input } from 'react-native-elements';
import { updatePassword } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: "",
      invisible: true,
      password: "",
    };
    this.user = this.props.user
    this.uid = this.user.user.uid
    this.account = {}
  }

  componentDidMount() {
    this.getPermission()
    if (this.account)
      this.setState({
        name: this.account["name"]
      })
  }

  getPermission() {
    const list = this.props.permissionList;
    this.account = list[this.uid]
  }

  resetField() {
    this.setState({
      edit: false,
      name: this.account["name"]
    })
  }

  navigateToScanner() {
    this.props.navigation.navigate('ScanScreen')
  }
  navigateToCreate() {
    this.props.navigation.navigate('QrCreator')
  }

  changePassword() {
    if (this.state.password != "" && this.state.password.length >= 6)
      this.props.updatePassword(this.state.password)
    else {
      alert("Mật khẩu phải ít nhất phải có 6-12 ký tự")
    }
  }

  render() {
    this.getPermission()
    const { name, password } = this.state
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderBar label="Thông tin cá nhân" navigation={this.props.navigation} />
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            <Text style={{ fontSize: 17, color: "#919aa3", fontWeight: 'bold', paddingLeft: 3 }}>Tài khoản</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.account["email"]}</Text>
          </View>

          {
            !this.state.edit &&
            <View style={{ paddingLeft: 5, paddingRight: 5 }}>

              <Text style={{ fontSize: 17, color: "#919aa3", fontWeight: 'bold', paddingLeft: 3 }}>Họ và tên</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.account["name"]}</Text>

            </View>
          }
          {
            this.state.edit &&
            <Input
              label="Họ và tên"
              placeholder="Họ tên"
              defaultValue={this.account["name"]}
              errorStyle={{ color: 'red' }}
              errorMessage={name == "" ? 'Đừng để trống' : ''}
              onChangeText={text => this.setState({ name: text })} />

          }
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            <Text style={{ fontSize: 17, color: "#919aa3", fontWeight: 'bold', paddingLeft: 3 }}>Loại tài khoản</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.account["type"]}</Text>
          </View>

          {
            this.state.edit &&
            <Input
              label="Mật khẩu"
              placeholder="Mật khẩu"
              maxLength={12}
              errorStyle={{ color: 'red' }}
              errorMessage={password == "" ? 'Đừng để trống' : ''}
              onChangeText={text => this.setState({ password: text })}
              rightIcon={
                <TouchableWithoutFeedback onPress={() => this.setState({ invisible: !this.state.invisible })}>
                  <Icon
                    name={this.state.invisible ? 'eye' : 'eye-slash'}
                    type="font-awesome"
                    color='black'
                  />
                </TouchableWithoutFeedback>
              }
              secureTextEntry={this.state.invisible} />
          }


          {global.permission == "order"
            &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '2.5%' }}>
              {!this.state.edit &&
                <Button
                  title="Sửa"
                  icon={<Icon name="create" type="ionicons" />}
                  onPress={() => this.setState({ edit: true })} />
              }
              {
                this.state.edit &&
                <Button title="Lưu"
                  icon={<Icon name="check" type="font-awesome" />}
                  onPress={() => this.changePassword()} />
              }
              {
                this.state.edit &&
                <Button title="Huỷ"
                  icon={<Icon name="close" type="ionicons" />}
                  onPress={() => this.resetField()} />
              }

              {!this.state.edit &&
                <Button
                  title="Quét mã"
                  icon={<Icon name="qrcode" type="font-awesome" />}
                  onPress={() => this.navigateToScanner()} />
              }
              {!this.state.edit &&
                <Button
                  title={`Tạo${'\n'}khách hàng`}
                  icon={<Icon name="add" type="ionicons" />}
                  onPress={() => this.navigateToCreate()} />
              }


            </View>
          }
          {global.permission != "order"
            &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '2.5%' }}>
              {
                !this.state.edit &&
                <Button title="Sửa"
                  icon={<Icon name="create" type="ionicons" />}
                  onPress={() => this.setState({ edit: true })} />
              }
              {
                this.state.edit &&
                <Button title="Lưu"
                  icon={<Icon name="check" type="font-awesome" />}
                  onPress={() => this.changePassword()} />
              }
              {
                this.state.edit &&
                <Button title="Huỷ"
                  icon={<Icon name="close" type="ionicons" />}
                  onPress={() => this.resetField()} />
              }


            </View>
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

export default connect(mapStateToProps, { updatePassword })(Profile)
