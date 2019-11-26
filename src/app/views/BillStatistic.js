import React from 'react'
import { billAnalyzer } from '../logics';
import ChartComponents from '../components/ChartComponents';
import { StyleSheet, Dimensions, View, Text, ActivityIndicator } from 'react-native';
import { retrieveCategory, retrieveBillList, retrieveMembers, retrieveTableList } from '../actions';
import { connect } from 'react-redux';
import { ButtonGroup } from 'react-native-elements';
import { appColor } from '../style';



const btnDay = () => <Text>Ngày</Text>
const btnWeek = () => <Text>Tuần</Text>
const btnMonth = () => <Text>Tháng</Text>

class BillStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedIndex: 0,
      screenWidth: Math.round(Dimensions.get('window').width),
      screenHeight: Math.round(Dimensions.get('window').height),
    }
  }

  async componentDidMount() {
    await this.props.retrieveCategory()
    await this.props.retrieveBillList();
    await this.props.retrieveMembers();
    await this.props.retrieveTableList();
  }

  componentDidUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.bill) != JSON.stringify(nextProps.bill) ||
      JSON.stringify(this.state.selectedIndex) != JSON.stringify(nextState.selectedIndex)) {
      const type = this.state.selectedIndex == 0 ? 'day' : this.state.selectedIndex == 1 ? 'week' : 'month'
      const data = billAnalyzer(type);
      this.setState({ data: data })
    }
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }


  render() {
    const buttons = [{ element: btnDay }, { element: btnWeek }, { element: btnMonth }]
    const { selectedIndex } = this.state
    if (!this.state.data[0]) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size={64} color={appColor.blue} />
        </View>
      )
    }
    else return (
      <View>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Thống kê doanh thu</Text>
        <ButtonGroup
          buttonStyle={[{ justifyContent: 'center', alignItems: 'center' }]}
          selectedButtonStyle={{ backgroundColor: appColor.blue, }}
          onPress={this.updateIndex.bind(this)}
          selectedIndex={selectedIndex}
          buttons={buttons} />
        <ChartComponents data={this.state.data} style={{ width: "100%", height: "90%" }} />
      </View>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

const mapStateToProps = state => {
  return {
    bill: state.bill.bill
  }
}

export default connect(mapStateToProps, { retrieveMembers, retrieveTableList, retrieveCategory, retrieveBillList })(BillStatistic)