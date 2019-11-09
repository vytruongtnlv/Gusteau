import React from 'react'
import { billAnalyzer } from '../logics';
import ChartComponents from '../components/ChartComponents';
import { Dimensions } from 'react-native';
export default class BillStatistic extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: Math.round(Dimensions.get('window').width),
      screenHeight: Math.round(Dimensions.get('window').height),
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }
  render() {
    const data = billAnalyzer('day');
    return (
      <ChartComponents data={data} style={{ width: "100%", height: "100%" }} />
    )
  }

}