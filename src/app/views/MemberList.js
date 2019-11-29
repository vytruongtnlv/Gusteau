import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateData } from '../actions';
import { memberStyle, orderStyle } from '../style';
import HeaderBar from '../components/HeaderBar';
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

  objectToArray(data) {
    const arr = []
    Object.keys(data).map(key => {
      arr.push({ id: key, item: data[key] })
    })
    arr.sort((a, b) => b["item"]["point"] - a["item"]["point"])
    return arr
  }

  displayMemberList() {
    const list = this.state.search != "" ? this.state.searchList : this.props.memberList;
    const { cost } = this.props.navigation.state.params
    const data = this.objectToArray(list)
    return (
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <TouchableOpacity
            style={{
              padding: 5, marginLeft: 5, marginRight: 5,
              marginVertical: 5, height: 50, borderRadius: 5,
              borderWidth: 1, flexDirection: 'row',
              justifyContent: 'space-between', alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('MemberView', { idMember: item.id, member: item["item"], cost: cost })}>

            <Text style={{ fontSize: 20 }}>{item["item"]["tel"]}</Text>
            <Text style={{ fontSize: 20 }}>{item["item"]["point"]}</Text>

          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
      />
    )
  }

  render() {
    return (
      <View style={{ width: "100%", height: "100%", }}>
        <HeaderBar label="Danh sách thành viên" navigation={this.props.navigation} />
        <SearchBar
          lightTheme
          containerStyle={{ backgroundColor: "white", marginLeft: 5, marginRight: 5, borderTopWidth: 0, marginTop: -15, borderBottomColor: 'black' }}
          inputContainerStyle={{ backgroundColor: "white", }}
          placeholder="Nhập số điện thoại..."
          keyboardType="phone-pad"
          onChangeText={(search) => this.searchMemberList(search)}
          value={this.state.search}
        />
        <View style={{ paddingLeft: "1.5%", paddingRight: "1.5%" }}>
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

