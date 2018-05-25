import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';

import store from './redux/Store';

import Root from './config/Router';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
