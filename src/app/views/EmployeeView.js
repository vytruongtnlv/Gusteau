import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { Input, Icon, ButtonGroup } from 'react-native-elements';
import Button from '../components/Button';
import { appColor } from '../style';

const btnNone = () => <Text>Nhân viên</Text>
const btnAdmin = () => <Text>Quản lý</Text>

class EmployeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      type: "",
      invisible: true,
      selectedIndex: 0
    };
  }

  componentDidMount() {
    // this.props.createUser(email, password)
  }

  createNewUser() {
    const permission = this.state.selectedIndex == 0 ? "none" : "all"
    this.props.createUser(`${this.state.email}@gus.com`, this.state.password, this.state.name, permission)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  render() {
    const buttons = [{ element: btnNone }, { element: btnAdmin }]
    const { selectedIndex } = this.state

    return (
      <View>
        <Input
          placeholder="Họ tên"
          onChangeText={text => this.setState({ name: text })} />
        <Input
          placeholder="Tài khoản"
          onChangeText={text => this.setState({ email: text })} />
        <Input
          placeholder="Mật khẩu"
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

        <ButtonGroup
          buttonStyle={[{ justifyContent: 'center', alignItems: 'center' }]}
          selectedButtonStyle={{ backgroundColor: appColor.blue, }}
          onPress={this.updateIndex.bind(this)}
          selectedIndex={selectedIndex}
          buttons={buttons} />
        <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Tạo tài khoản mới" onPress={() => this.createNewUser()} />

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, { createUser })(EmployeeView)
