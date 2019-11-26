import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import Button from './Button';
import { connect } from 'react-redux';
import { updateData } from '../actions';
import { Input, Icon } from 'react-native-elements';
import { setConst } from '../config';
class TableDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableName: "",
      tableArea: "",
      save: false,
      edit: false,
      checkdel: false,
      available: true,
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    if (params && !params["create"]) {
      const { key, table } = params
      this.setState({
        tableName: table["tableName"],
        tableArea: table["area"]
      })
    }
    else if (params && params["create"]) {
      const { area } = params
      this.setState({
        tableArea: area
      })
    }
  }

  resetField() {
    const { params } = this.props.navigation.state
    const { key, table } = params
    this.setState({
      edit: false,
      tableName: table["tableName"],
      tableArea: table["area"]
    })
  }

  delete(id) {
    const { tableArea, tableName } = this.state
    Alert.alert(
      'Xác nhận',
      `Xoá ${tableName}`,
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => this.tableHandle(id, true) },
      ],
      { cancelable: false },
    );
  }

  tableHandle(id, del) {
    const available = del ? false : true;
    const key = `table`
    const { tableArea, tableName } = this.state
    if (tableArea != "" && tableName != "") {
      const value = {
        available: available,
        area: tableArea,
        tableName: tableName,
        tableStatus: setConst.empty
      }
      setTimeout(() => {
        id ? this.props.updateData({ key, value, id }) : this.props.updateData({ key, value })
      }, 1500)
      this.props.navigation.navigate("Tables");
    }
    else {
      alert("Vui lòng điền đủ thông tin!")
    }
  }

  render() {
    const { params } = this.props.navigation.state
    if (params && params["create"]) return (
      <View>
        <Input
          label="Tên bàn"
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.tableName == "" ? 'Đừng để trống' : ''}
          placeholder="Tên bàn"
          onChangeText={text => this.setState({ tableName: text })} />
        <Input
          label="Khu vực"
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.tableArea == "" ? 'Đừng để trống' : ''}
          value={this.state.tableArea}
          onChangeText={text => this.setState({ tableArea: text })} />
        <View style={{ justifyContent: 'space-around', marginTop: 5, flexDirection: 'row' }}>
          <Button title="Thêm"
            onPress={() => this.tableHandle()}
            icon={<Icon name="add" type="ionicons" />} />
          <Button title="Quay về"
            onPress={() => this.props.navigation.goBack()}
            icon={<Icon name="arrow-back" type="ionicons" />} />
        </View>

      </View>
    )
    else {
      const { key, table } = params
      return (
        <View>
          {!this.state.edit &&
            <View>
              <Text style={{ fontSize: 14 }}>Tên bàn</Text>
              <Text style={{ fontSize: 20 }}> {table["tableName"]} </Text>
              <Text style={{ fontSize: 14 }}>Khu vực</Text>
              <Text style={{ fontSize: 20 }}> {table["area"]} </Text>
            </View>
          }
          {
            this.state.edit &&
            <View>
              <Input
                label="Tên bàn"
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.tableName == "" ? 'Đừng để trống' : ''}
                value={this.state.tableName}
                onChangeText={text => this.setState({ tableName: text })} />
              <Input
                label="Khu vực"
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.tableArea == "" ? 'Đừng để trống' : ''}
                value={this.state.tableArea}
                onChangeText={text => this.setState({ tableArea: text })} />
            </View>
          }
          <View style={{ marginTop: 10, }}>
            {!this.state.edit &&
              <View style={{ justifyContent: 'space-around', width: "100%", flexDirection: 'row' }}>
                <Button
                  title="Sửa"
                  icon={<Icon name="create" type="ionicons" />}
                  onPress={() => this.setState({ edit: true })} />
                <Button
                  title="Xoá"
                  icon={<Icon name="trash" type="font-awesome" />}
                  onPress={() => this.delete(key)} />
                <Button
                  icon={<Icon name="arrow-back" type="ionicons" />}
                  title="Quay về"
                  onPress={() => this.props.navigation.goBack()} />
              </View>
            }
            {this.state.edit &&
              <View style={{ justifyContent: 'space-around', width: "100%", flexDirection: 'row' }}>
                <Button
                  title="Lưu"
                  icon={<Icon name="check" type="font-awesome" />}
                  onPress={() => this.tableHandle(key)} />
                <Button
                  title="Huỷ"
                  icon={<Icon name="close" type="ionicons" />}
                  onPress={() => this.resetField()} />
                <Button
                  icon={<Icon name="arrow-back" type="ionicons" />}
                  title="Quay về"
                  onPress={() => this.props.navigation.goBack()} />
              </View>
            }
          </View>
        </View>
      );
    }
  }
}
const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, { updateData })(TableDetail)