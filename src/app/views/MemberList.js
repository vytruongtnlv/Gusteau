import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateData } from '../actions';
import { memberStyle, orderStyle } from '../style';
class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchList: {}
    };
  }



  searchMemberList = async (search) => {
    await this.setState({ search })
    const list = this.props.memberList;
    var searchList = {}
    if (Object.keys(list)[0]) {
      Object.keys(list).forEach(id => {
        if (list[id]["tel"].indexOf(search) != -1) {
          searchList[id] = list[id]
        }
      })
    }
    await this.setState({ searchList: searchList })
  }

  displayMemberList() {
    const list = Object.keys(this.state.searchList)[0] ? this.state.searchList : this.props.memberList;
    const { cost } = this.props.navigation.state.params
    return Object.keys(list).map(id => {
      return (
        <TouchableOpacity
          style={{ marginVertical: "0.25%" }}
          onPress={() => this.props.navigation.navigate('MemberView', { idMember: id, member: list[id], cost: cost })}>
          <Text style={[memberStyle.fontSize]}>{list[id]["tel"]}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View >
        <SearchBar
          lightTheme
          containerStyle={{ backgroundColor: "white", }}
          inputContainerStyle={{ backgroundColor: "white", }}
          placeholder="Nhập số điện thoại..."
          keyboardType="phone-pad"
          onChangeText={(search) => this.searchMemberList(search)}
          value={this.state.search}
        />
        <View style={{ paddingLeft: "1.5%", paddingRight: "1.5%" }}>
          <Text style={[orderStyle.fontSize, { textAlign: 'center' }]}>Danh sách thành viên</Text>
          {this.displayMemberList()}
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    memberList: state.members.members,
  }
}

export default connect(mapStateToProps, { updateData })(MemberList)

