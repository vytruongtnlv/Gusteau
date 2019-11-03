import React from 'react'
import { billAnalyzer } from '../logics';
import ChartComponents from '../components/ChartComponents';

export default class BillStatistic extends React.PureComponent {

  render() {
    const data = billAnalyzer('day');

    return (
      <ChartComponents data={data} style={{ width: "100%", height: "100%" }} />
    )
  }

}