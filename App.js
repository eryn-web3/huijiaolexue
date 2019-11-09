/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createReduxContainer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import AppNavigator from './app/navigation/AppNavigator';
import reducers from './app/reducers';
import config from './app/constants/config';
import SplashScreen from 'react-native-splash-screen';

console.disableYellowBox = true;


const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);

const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  reducers,
  applyMiddleware(middleware),
);

export default class Root extends Component<{}> {
  constructor(properties) {
    super(properties);
  }

  componentWillUnmount() {
    
  }

  componentDidMount() {
    SplashScreen.hide();    
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
