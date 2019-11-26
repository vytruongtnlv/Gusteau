import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import { retrieveTableList } from '../actions';
import TableFoodComponent from '../components/TableFoodComponent';
import { displayTableArea } from '../logics/displayData';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from '../style';
import TableArea from '../components/TableArea';
class TableListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'LoadTable',
      area: [],
      // show: true,
    }

  }
  async componentDidMount() {
    await this.retrieveData()
    this.setArea()
  }

  retrieveData() {
    this.props.retrieveTableList()
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.tableList) != JSON.stringify(prevProps.tableList)) {
      this.setArea()
    }
  }

  setArea() {
    const arr = displayTableArea(this.props.tableList);
    this.setState({ area: arr })
  }

  displayArea() {
    return (
      <View>
        <FlatList
          data={this.state.area}
          renderItem={({ item }) =>
            <View key={item.id} style={[styles.tableContainer]}>
              <TableArea key={item.id} navigation={this.props.navigation} area={item} />
            </View>
          }
          keyExtractor={item => item.id}
        />
      </View>

    )
  }



  renderList(area) {
    const tableList = this.props.tableList
    return Object.keys(tableList).map(key => {
      if (tableList[key]["area"] == area)
        return (
          <TableFoodComponent key={key} idTable={key} table={tableList[key]} navigation={this.props.navigation} />
        )
      else return null;
    })
  }

  render() {
    const tableList = this.props.tableList
    if (Object.keys(tableList).length === 0)
      return null
    else return (
      <View
        style={styles.bigContainer}>
        <ScrollView>
          {this.displayArea()}
        </ScrollView>
      </View >

    )

  }
}
const mapStateToProps = state => {
  return {
    tableList: state.tableDB.tableList,
  }
}

export default connect(mapStateToProps, { retrieveTableList })(TableListView)