import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { retrieveTableList } from '../actions';
import { displayTableArea } from '../logics/displayData';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { Icon } from 'react-native-elements';
class TableManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [],
      edit: false,
      selectedArea: "",
      rerender: true
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ rerender: !this.state.rerender });
    });
    const data = displayTableArea(this.props.tableList);
    const list = this.getArea(data);
    await this.setState({
      area: list,
      selectedArea: list[0] ? list[0]["props"]["value"] : ""
    })
  }

  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

  getArea(data) {
    let list = [];
    Object.keys(data).forEach(key => {
      list.push(<Picker.Item key={key.toString()} label={data[key]} value={key} />)
    })
    return list
  }

  getTableByArea() {
    const tableList = this.props.tableList;
    const index = this.state.selectedArea != "" ? parseInt(this.state.selectedArea) : 0
    const area = this.state.area[index] ? this.state.area[index]["props"]["label"] : ""
    return Object.keys(tableList).map(key => {
      if (tableList[key]["area"] == area)
        return (
          <TouchableOpacity
            style={{ padding: 5, marginLeft: 5, marginRight: 5, marginVertical: 5, height: 50, borderRadius: 5, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}
            onLongPress={() => this.props.navigation.navigate("TableDetail", { key: key, table: tableList[key] })}>
            <Text style={{ fontSize: 14 }}>{tableList[key]["tableName"]}</Text>
            <Icon name="create" type="ionicons" onPress={() => this.props.navigation.navigate("TableDetail", { key: key, table: tableList[key] })} />
          </TouchableOpacity>
        )
      else return null;
    })
  }

  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderBar label="Quản lý bàn ăn" navigation={this.props.navigation} rightComponent={
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TableDetail", { create: true, area: this.state.area[this.state.selectedArea]["props"]["label"] })}>
            <Icon name='add' type="ionicons" />
          </TouchableOpacity>} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ paddingLeft: "1.5%", fontSize: 17, fontWeight: 'bold' }}>Khu vực bàn</Text>
          <Picker
            style={{ height: 50, width: 200 }}
            selectedValue={this.state.selectedArea}
            onValueChange={(selected) => this.setState({ selectedArea: selected })}>
            {this.state.area}
          </Picker>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}>
          {this.getTableByArea()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableList: state.tableDB.tableList,
  }
}

export default connect(mapStateToProps, { retrieveTableList })(TableManagement)
