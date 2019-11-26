import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import EmployeeCard from '../components/EmployeeCard';
import { retrievePermissions } from '../actions';
import HeaderBar from '../components/HeaderBar';
import { Icon } from 'react-native-elements';
class EmployeeManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  displayEmployee() {
    const data = this.props.permissionList
    return (
      Object.keys(data).map(key => {
        if (data[key]["permission"] != "all")
          return <EmployeeCard navigation={this.props.navigation} id={key} key={key.toString()} item={data[key]} />
      })
    )
  }

  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderBar label="Quản lý nhân viên" navigation={this.props.navigation} rightComponent={
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("EmployeeView", { create: true })}>
            <Icon name='add' type="ionicons" />
          </TouchableOpacity>} />
        {this.displayEmployee()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    permissionList: state.auth.permissionList,
  }
}


export default connect(mapStateToProps, { retrievePermissions })(EmployeeManagement)
