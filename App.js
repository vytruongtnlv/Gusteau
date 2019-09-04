import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import reducers from './src/app/reducers'
import Login from './src/app/views/Login';
import thunk from 'redux-thunk';
export default class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <View>
          <Login />
        </View>
      </Provider>
    );
  }
}
