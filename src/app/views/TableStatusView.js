import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../style';
import OrderDetail from '../components/OrderDetail';
import { connect } from 'react-redux';
import { retrieveBillList } from '../actions';
import { getBillByIdTable } from '../logics';

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
    console.log(this.props.bill[idBill])
    const billinfo = this.props.bill[idBill]["billInfo"]
    return Object.keys(billinfo).map(id => {
      return <OrderDetail item={billinfo[id]} id={id} key={id} />
    })
  }

  render() {
    console.log('res ', this.props.currentTable)
    return (
      <View style={this.props.style}>
        <View>
          <Text> TableStatusView </Text>
        </View>
        {this.props.currentTable != "" && this.displayOrders()}

        <View style={{
          justifyContent: 'space-between', flexDirection: 'row',
          position: 'absolute', bottom: 10, width: "100%"
        }}>
          <TouchableOpacity style={{ left: 20 }}>
            <Text>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ right: 20 }}>
            <Text>Check out</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, { retrieveBillList })(TableStatusView)
