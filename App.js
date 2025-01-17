import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux'
import reducers from './src/app/reducers'
import Route from './Route';
import Login from './src/app/views/Login';
import store from './store';
import { ScanScreen } from './src/app/views/ScanScreen';
import Payment from './src/app/views/Payment';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Route />
        {/* <Payment /> */}
        {/* <ScanScreen /> */}
      </Provider>
    );
  }
}
