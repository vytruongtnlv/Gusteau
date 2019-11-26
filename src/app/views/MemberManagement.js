import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { updateData } from '../actions';
import { Icon } from 'react-native-elements';
import HeaderBar from '../components/HeaderBar';
class MemberManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      increase: true
    };
  }

  objectToArray() {
    const data = this.props.memberList
    const arr = []
    Object.keys(data).map(key => {
      arr.push(data[key])
    })
    if (this.state.increase)
      arr.sort((a, b) => a["point"] - b["point"])
    else
      arr.sort((a, b) => b["point"] - a["point"])
    return arr
  }

  displayMember() {
    const data = this.objectToArray()
    return (
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <View style={{
            padding: 5, marginLeft: 5, marginRight: 5,
            marginVertical: 5, height: 50, borderRadius: 5,
            borderWidth: 1, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
          }}>
            <Text style={{ fontSize: 20 }}>{item["tel"]}</Text>
            <Text style={{ fontSize: 20 }}>{item["point"]}</Text>

          </View>
        }
        keyExtractor={item => item.id}
      />
    )
  }

  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderBar label="Quản lý thành viên" navigation={this.props.navigation} rightComponent={
          <TouchableOpacity
            onPress={() =>
              this.setState({ increase: !this.state.increase })}>
            <Icon name='sort' type="font-awesome" />
          </TouchableOpacity>} />
        {this.displayMember()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberList: state.members.members,
  }
}

export default connect(mapStateToProps, { updateData })(MemberManagement)
