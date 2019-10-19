import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ChartView from 'react-native-highcharts';
import moment from 'moment';

export default class ChartComponents extends Component {

  render() {
    const arr = this.props.data

    var Highcharts = 'Highcharts';
    var conf = {
      chart: {
        zoomType: 'x',
        type: 'spline',
        animation: Highcharts.svg,
        margin: 100
      },
      title: {
        text: 'Bill statistic'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function () {
            return Highcharts.dateFormat('%d-%m-%Y', this.value);
          }
        },
        maxPadding: 0.05,
        showLastLabel: true
      },
      yAxis: {
        text: 'value',
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }],
        labels: {
          format: '{value}'
        },
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'data',
        data: (function () {
          var data = [];
          arr.forEach(item => {
            data.push({
              x: item["startDate"],
              y: item["price"]
            });
          })
          return data;
        }())
      }],
      plotOptions: {
        marker: {
          lineWidth: 1
        }
      }
    };
    const options = {
      global: {
        useUTC: false
      },
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      }
    };
    return (
      <ChartView style={this.props.style} config={conf} options={options} ></ChartView >
    );
  }
}
