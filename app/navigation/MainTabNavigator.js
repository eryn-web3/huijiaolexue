import React from 'react';
import { Platform, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'

import HomePage from '../screens/home/HomePage';
import SearchPage from '../screens/home/SearchPage';

import StudyPage from '../screens/study/StudyPage';
import CourseTypePage from '../screens/study/CourseTypePage';
import ResourcePage from '../screens/study/ResourcePage';

import ProfilePage from '../screens/profile/ProfilePage';
import FavoritePage from '../screens/profile/FavoritePage';
import HistoryPage from '../screens/profile/HistoryPage';
import DownloadPage from '../screens/profile/DownloadPage';
import SettingPage from '../screens/profile/SettingPage';

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

const HomeStack = createStackNavigator({
  HomePage: HomePage,
  SearchPage: SearchPage,
  ResourcePageHome: ResourcePage,
  NetworkErrorPage: NetworkErrorPage,
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

HomeStack.navigationOptions = ( {navigation} ) =>{
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (
        route.routeName === "SearchPage" ||
        route.routeName === "ResourcePageHome" ||
        route.routeName === "NetworkErrorPage"
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name="home"
        title="首页"
        img= {require('../assets/images/icon/TabIcon/home.png')}
      />
    ),
    tabBarVisible: tabBarVisible
  };
};



const StudyStack = createStackNavigator({
  StudyPage: StudyPage,
  CourseTypePage: CourseTypePage,
  ResourcePageStudy: ResourcePage,
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

StudyStack.navigationOptions = ( {navigation} ) =>{
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (
        route.routeName === "CourseTypePage" ||
        route.routeName === "ResourcePageStudy" 
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarLabel: '学习',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name="study"
        title="学习"
        img= {require('../assets/images/icon/TabIcon/study.png')}
      />
    ),
    tabBarVisible: tabBarVisible
  };
};




const ProfileStack = createStackNavigator({
  ProfilePage: ProfilePage,
  FavoritePage: FavoritePage,
  HistoryPage: HistoryPage,
  DownloadPage: DownloadPage,
  ResourcePageProfile: ResourcePage,
  SettingPage: SettingPage,
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

ProfileStack.navigationOptions = ( {navigation} ) =>{
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (
        route.routeName === "FavoritePage" ||
        route.routeName === "HistoryPage" ||
        route.routeName === "DownloadPage" ||
        route.routeName === "ResourcePageProfile" ||
        route.routeName === "SettingPage" 
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name="profile"
        title="我的"
        img= {require('../assets/images/icon/TabIcon/profile.png')}
      />
    ),
    tabBarVisible: tabBarVisible
  };
};


export default createBottomTabNavigator({
  HomeStack,
  StudyStack,
  ProfileStack,
},
{
  tabBarOptions: {
    activeTintColor: Colors.blueColor,
    style: {
      backgroundColor: Colors.tabBk,
      height: 60
    },
    labelStyle: {
      color: Colors.whiteColor
    }
  }
});
