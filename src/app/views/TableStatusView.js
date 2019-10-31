import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../style';
import OrderDetail from '../components/OrderDetail';
import { connect } from 'react-redux';
import { retrieveBillList, updateData } from '../actions';
import { getBillByIdTable, checkOutByTable, changeTableStatus } from '../logics';
import Button from '../components/Button';

class TableStatusView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.retrieveData()
  }

  retrieveData() {
    this.props.retrieveBillList();
  }

  displayOrders() {
    const idBill = getBillByIdTable(this.props.currentTable)
    if (idBill) {
      const billinfo = this.props.bill[idBill]["billInfo"]
      if (billinfo)
        return Object.keys(billinfo).map(id => {
          return <OrderDetail item={billinfo[id]} id={id} key={id} />
        })
    }
  }



  handleCheckOut() {
    if (this.props.currentTable != "") {
      const obj = checkOutByTable(this.props.currentTable)
      this.props.updateData(obj);
      const tableObj = changeTableStatus(this.props.currentTable, "Empty")
      this.props.updateData(tableObj);
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <View>
          <Text style={{ fontSize: 24, textAlign: 'center' }}> Orders </Text>
        </View>
        {this.props.currentTable != "" && this.displayOrders()}

        <View style={{
          justifyContent: 'space-between', flexDirection: 'row',
          position: 'absolute', bottom: 10, width: "100%"
        }}>
          <Button style={{ left: 20 }} title="Gọi món" onPress={() => this.props.navigation.navigate('OrderView')} />
          {/* <Button style={{ right: 20 }} title="Check Out" onPress={this.handleCheckOut.bind(this)} /> */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    foodList: state.foodList.foodList,
    priceList: state.foodList.priceList,
    bill: state.orders.bill,
    currentTable: state.tableDB.idTable
  }
}


export default connect(mapStateToProps, { retrieveBillList, updateData })(TableStatusView)
