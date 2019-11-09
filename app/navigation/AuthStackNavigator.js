import React from 'react';
import { Platform, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'

import LoginPromptPage from '../screens/home/LoginPromptPage';
import LoginPage from '../screens/home/LoginPage';

import NetworkErrorPage from '../screens/error/NetworkErrorPage';


import TabBarIcon from '../components/common/TabBarIcon';
import Icon from 'react-native-vector-icons/FontAwesome';

// constant
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;
import config from '../constants/config';

export default createStackNavigator({
  LoginPromptPage: LoginPromptPage,
  LoginPage: LoginPage,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: 'transparent',
    headerTitleStyle:{
      textAlign: 'center',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      flexGrow:1,
      alignSelf:'center',
      marginRight: Platform.select({
        ios: 18,
        android:76
      })
    },
    headerTransparent: true, 
  }
});

