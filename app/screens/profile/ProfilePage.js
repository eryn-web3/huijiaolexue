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
import DeviceInfo from 'react-native-device-info';
import Entypo from 'react-native-vector-icons/Entypo';
import RNFetchBlob from 'rn-fetch-blob';

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
const RateWH = LH/LW;
import config from '../../constants/config';

import styles from './ProfilePageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class ProfilePage extends React.Component {
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
      loading: true,
      userName: '',
      cacheSize: 0
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();    

    this.getCacheSize();

    var storage = await HJ_Utils.getStorage()
    
    HJ_Utils.log(5, "-- ProfilePage componentDidMount storage.user.userId : ", storage.user.userId);

    var ret = await fetch(config.api_url+'/getProfileInfo', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: storage.user.userId
      })
    }).then(async data => {       
      var ret = await data.json();      
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- ProfilePage componentDidMount getProfileInfo e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- ProfilePage componentDidMount getProfileInfo ret : ", ret);

    storage.user.userName = ret.data.userInfo.user_nickname;
    HJ_Utils.setStorage( storage );

    this.setState({
      userName: ret.data.userInfo.user_nickname,
      loading: false
    })
  }


  goSettingPage() {
    var { userName } = this.state
    this.props.navigation.navigate('SettingPage');
  }


  async getCacheSize() {
    var storage = await HJ_Utils.getStorage();
    var downloads = storage.downloads;

    var cacheSize = 0;
    for( var i=0; i<downloads.length; i++ ){
      var download = downloads[i];
      var size = await RNFetchBlob.fs.stat(download.downloadFile)
      .then((stats) => {
        return stats.size
      })
      .catch((err) => {
        return 0;
      })

      cacheSize += size;      
    }

    this.setState({
      cacheSize: cacheSize
    })
  }


  async clearDownloads(){
    var dirs = RNFetchBlob.fs.dirs.DocumentDir;
    var storage = await HJ_Utils.getStorage();
    var downloads = storage.downloads;

    downloads.map( (download) => {
      RNFetchBlob.fs.unlink( download.downloadFile )
    } )
    
    storage.downloads = [];
    HJ_Utils.setStorage( storage );
  }

  
  render() {
    var { userName } = this.state;

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <Text style={styles.headerTxt}>我的</Text>
          </View>               
        </View>
        
        <View style={styles.mainContent}>
          
          <View style={{backgroundColor: '#fff', paddingTop: 70, paddingBottom: 70, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
            <Text style={{fontSize: 16, color: '#333', textAlign: 'center'}}>{userName}</Text>
            <View style={{position: 'absolute', top: 40, left: 20}}>
              <Image source={require('../../assets/images/head.png')} style={{width: 70, height: 70, borderRadius: 35}} />
            </View>
            <TouchableOpacity style={{position: 'absolute', top: 70, right: 20}} onPress={this.goSettingPage.bind(this)}>
              <Text style={{fontSize: 16, color: '#00cdaf'}}>修改</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{flexDirection: 'row', backgroundColor: '#fff', marginTop: 10, paddingVertical: 50, borderBottomWidth: 1, borderBottomColor: '#ddd', alignItems: 'center'}}>
            <TouchableOpacity style={{width: LW/3, alignItems:'center'}} onPress={()=>{this.props.navigation.navigate('FavoritePage')}}>
              <Image source={require('../../assets/images/005shoucang.png')} style={{width: 35, height: 35}} />
              <Text style={{fontSize: 18, color: '#666', marginTop: 10}}>我的收藏</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: LW/3, alignItems:'center'}} onPress={()=>{this.props.navigation.navigate('HistoryPage')}}>
              <Image source={require('../../assets/images/005guankanlishi.png')} style={{width: 35, height: 35}} />
              <Text style={{fontSize: 18, color: '#666', marginTop: 10}}>观看历史</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: LW/3, alignItems:'center'}} onPress={()=>{this.props.navigation.navigate('DownloadPage')}}>
              <Image source={require('../../assets/images/005wodehuancun.png')} style={{width: 35, height: 35}} />
              <Text style={{fontSize: 18, color: '#666', marginTop: 10}}>我的缓存</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', backgroundColor: '#fff', marginTop: 10, paddingVertical: 15, paddingLeft: 40, borderBottomWidth: 1, borderBottomColor: '#ddd', alignItems: 'center', flexDirection: 'row'}}>
            <View>
              <Image source={require('../../assets/images/005qinglihuancun.png')} style={{width: 25, height: 25}} />
            </View>            
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 18, color: '#666'}}>清除缓存</Text>
            </View>            
            <TouchableOpacity style={{position: 'absolute', top: 15, right: 20, alignItems:'center', flexDirection: 'row'}} onPress={this.clearDownloads.bind(this)}>
              <Text style={{fontSize: 16, color: '#666'}}>{parseFloat(this.state.cacheSize/1000000).toFixed(2)}M</Text>
              <Entypo name="chevron-thin-right" size={20} color="#666"></Entypo>
            </TouchableOpacity>
          </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);