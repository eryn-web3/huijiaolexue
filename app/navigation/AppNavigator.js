import React, { Component } from 'react';
import { Image } from 'react-native';

import { createSwitchNavigator } from 'react-navigation';

import AuthStackNavigator from './AuthStackNavigator';
import MainTabNavigator from './MainTabNavigator';

export default AppNavigator = createSwitchNavigator({
  Auth: AuthStackNavigator,
  Main: MainTabNavigator,
});
