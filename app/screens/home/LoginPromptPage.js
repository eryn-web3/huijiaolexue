import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Linking,
  Modal,
  StatusBar,
  AsyncStorage,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/AntDesign';
import HJ_Utils from '../../utils/HJUtils'
import Carousel from 'react-native-looped-carousel';
import Orientation from 'react-native-orientation-locker';
import { WebView } from 'react-native-webview'


// custom component
import Loading from '../../components/common/Loading';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/user';
import * as FavoriteActions from '../../actions/favorite';
import * as LikeActions from '../../actions/like';

// constant
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const LHOrigin = Layout.window.heightOrigin;
const RateWH = LH/LW;
import config from '../../constants/config';

import styles from './LoginPromptPageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class LoginPromptPage extends React.Component {
  static navigationOptions = {
    header: null,
  };


  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor(props) {
    super(props);

    this.state = {
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    SplashScreen.hide();
    Orientation.lockToPortrait();    

    var storage = await HJ_Utils.getStorage()
    if( !HJ_Utils.checkValid( storage ) ){
      storage = HJ_Utils.defaultStorage();
      await HJ_Utils.setStorage( storage )
    }

    var user = storage.user;
    var curTime = new Date();    
    if( HJ_Utils.checkValid( storage.user ) ){
      var expireTime = new Date(storage.user.expire);
      console.log('-- curTime : ', curTime);
      console.log('-- expireTime : ', expireTime);
      diff = expireTime - curTime;
      console.log('-- diff : ', diff);
      if( curTime < expireTime ){
        this.props.navigation.navigate('HomePage');
      }
    }
  }

  
  render() {

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" translucent={false}/>
        
        <View style={styles.mainContent}>
          <Image source={require('../../assets/images/default.png')} style={{width: 90, height: 90, borderRadius: 45, marginTop: 70}} />
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 15}}>登 录</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 60}}>将跳转至青岛e平台</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 10}}>登录入口登录</Text>
          <TouchableOpacity style={styles.navBtn} onPress={()=>{this.props.navigation.navigate('LoginPage')}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>确定</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      UserActions: bindActionCreators(UserActions, dispatch),
      FavoriteActions: bindActionCreators(FavoriteActions, dispatch),
      LikeActions: bindActionCreators(LikeActions, dispatch),
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPromptPage);