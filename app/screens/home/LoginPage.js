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

import styles from './LoginPageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class LoginPage extends React.Component {
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
      loading: false,
      recommendData: [], 
      subjectData: [], 
      bannerData: []
    }

  }


  async setLogin( uniqueId ) {
    HJ_Utils.log(5, "-- LoadingPage setLogin uniqueId : ", uniqueId);
    var ret = await fetch(config.api_url+'/setLogin', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: uniqueId
      })
    }).then(async data => {       
      var ret = await data.json();      
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- LoadingPage componentDidMount setLogin e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- LoadingPage componentDidMount setLogin ret : ", ret);

    if( ret.data.status == false ){
      this.props.navigation.navigate('NetworkErrorPage');
      this.setState({
        loading: false
      })
      return;
    }

    var storage = await HJ_Utils.getStorage()
    if( !HJ_Utils.checkValid( storage ) ){
      storage = HJ_Utils.defaultStorage();
      await HJ_Utils.setStorage( storage )
    }
    HJ_Utils.log(5, "-- LoadingPage componentDidMount storage : ", storage);

    storage.user.userId = uniqueId;
    if( storage.user.userName == '' ) storage.user.userName = uniqueId;
    storage.user.expire = new Date();
    storage.user.expire.setMonth(storage.user.expire.getMonth() + 1);
    await HJ_Utils.setStorage( storage );

    this.props.navigation.navigate('HomePage');
  }

  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait(); 
  }

  
  render() {
    var { recommendData, subjectData, bannerData } = this.state;

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var whiteLists = ['*']
    if( Platform.OS == 'ios' ){
      whiteLists = ['http://', 'https://', 'file://'];
    }

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" translucent={false}/>
        
        <View style={styles.mainContent}>
          <WebView
            containerStyle={{backgroundColor: '#fff'}}
            style={{flex: 1, width: LHOrigin, height: LW, }}
            ref={r => (this.webref = r)}
            originWhitelist={whiteLists}
            useWebKit={true}
            source={{
              uri: config.login_url,
              headers: {"Access-Control-Allow-Origin": "*"}
            }}
            style={{ marginTop: 0 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            cacheEnabled={false}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            onMessage={async event => {

              if( !event.nativeEvent || !event.nativeEvent.data || event.nativeEvent.data == "undefined" ) {
                return;
              }

              var data = JSON.parse( event.nativeEvent.data );
              if( data.type == 'start' ){
                this.setLogin( data.uac );
              }

              
            }}
            onNavigationStateChange={navState => {
              // Keep track of going back navigation within component     
            }}
            onError={ (e) => {                 
              let insecureHosts = [-1004, -6, -1202];//all error codes as displayed on your console 
              if(e){
                  //Handles NSURLErrorDomain in iOS and net:ERR_CONNECTION_REFUSED in Android
                  if(insecureHosts.indexOf(e.nativeEvent.code) !== -1){
                    console.log('-- insecureHosts error : ', e.nativeEvent);
                  }
              } else {
              //loads the error view only after the resolving of the above errors has failed
                return(
                  <View>
                      Error occurred while loading the page.
                  </View>
                );
              }}
            }
          />

        </View>
        

        <View style={[styles.loading, {display: this.state.loading ? 'flex' : 'none', zIndex: this.state.loading ? 10000 : -1}]}>
          {loading}
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);