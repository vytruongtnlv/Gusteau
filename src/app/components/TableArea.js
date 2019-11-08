import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TableFoodComponent from './TableFoodComponent';
import { styles } from '../style';

class TableArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  handlePress() {
    this.setState({
      show: !this.state.show
    })
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
    const area = this.props.area
    return (
      <TouchableOpacity
        style={styles.contentPanal}
        onPress={this.handlePress.bind(this)}>
        <View style={{ width: "100%", marginLeft: 10 }}>
          <Text style={styles.areaText}>{area}</Text>
        </View>
        {this.state.show && this.renderList(area)}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableList: state.tableDB.tableList,
  }
}

export default connect(mapStateToProps, {})(TableArea)