import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HJ_Utils from '../../utils/HJUtils'

const home_icon_img = require('../../assets/images/icon/TabIcon/home.png');
const study_icon_img = require('../../assets/images/icon/TabIcon/study.png');
const profile_icon_img = require('../../assets/images/icon/TabIcon/profile.png');



const home_sel_icon_img = require('../../assets/images/icon/TabIcon/home_.png');
const study_sel_icon_img = require('../../assets/images/icon/TabIcon/study_.png');
const profile_sel_icon_img = require('../../assets/images/icon/TabIcon/profile_.png');

import Colors from '../../constants/Colors';
const TAB_ICON_SIZE = 25;

export default class TabBarIcon extends React.Component {
  render() {
    var img = '';
    if( this.props.name === 'home' ){
      img = this.props.focused ? home_sel_icon_img : home_icon_img;
    } else if( this.props.name === 'study' ){
      img = this.props.focused ? study_sel_icon_img : study_icon_img;
    } else if( this.props.name === 'profile' ){
      img = this.props.focused ? profile_sel_icon_img : profile_icon_img;
    }

    return (
      <View>
        <Image source={img} style={{width: TAB_ICON_SIZE, height: TAB_ICON_SIZE, marginTop: 10}}/>
        <Text style={{color: this.props.focused==true ? '#00ccaf':'#7e7e7e'}}>{this.props.title}</Text>
      </View>
    );
  }
}