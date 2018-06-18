import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { isSignedIn } from "./config/Auth";

import configureStore from './redux/Store';

import { createRootNavigator } from './config/Router';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
      store: undefined,
      persistor: undefined
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => {
        const {store, persistor} = configureStore();
        this.setState({ signedIn: res, checkedSignIn: true, store: store, persistor: persistor});
      })
      .catch(err => alert("An error occurred"));
  }
  
  render() {
    const { checkedSignIn, signedIn, store, persistor} = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
    
    const Layout = createRootNavigator(signedIn);
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout />
          </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});

