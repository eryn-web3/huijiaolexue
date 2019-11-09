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
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HJ_Utils from '../../utils/HJUtils'
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
import QRCode from 'react-native-qrcode-svg';
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
const LHOrigin = Layout.window.heightOrigin;
const RateWH = LH/LW;
import config from '../../constants/config';

import styles from './ResourcePageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


// images


 

class ResourcePage extends React.Component {
  static navigationOptions = {
    header: Platform.OS === 'ios' ? <View><Text> </Text></View> : null
  };


  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      resource: this.props.navigation.state.params, 
      visibleShareModal: false,
      visibleQRModal: false,
      usageData: null,
      contentData: null
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToLandscapeLeft();

    var storage = await HJ_Utils.getStorage()

    var resource = this.props.navigation.state.params;

    var contentInfo = await fetch(config.api_url+'/getContentInfo', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: resource.id,
        user_id: storage.user.userId
      })
    }).then(async data => {
      var ret = await data.json();
      HJ_Utils.log(5, "-- ResourcePage componentDidMount ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- ResourcePage componentDidMount e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- ResourcePage componentDidMount contentInfo : ", contentInfo);

    var isDownload = false;    
    if( HJ_Utils.checkValid( storage ) ){
      var downloads = storage.downloads;    
      for( var i=0; i<downloads.length; i++ ){
        if( downloads[i].resource.id == resource.id ){
          isDownload = true;
          break;
        }
      }
    }

    this.setState({
      loading: false,
      usageData: contentInfo.data.usageData,
      contentData: contentInfo.data.contentData[0],
      storage: storage,
      isDownload: isDownload
    })
  }


  componentWillReceiveProps

  /**
   * @method componentWillUnmount
   * @description This function is called component is loaded.
   */
  async componentWillUnmount() {
    Orientation.lockToPortrait();
  }


  async onFavorite( resource ) {
    HJ_Utils.log(5, "-- ResourcePage onFavorite start : ");
    var storage = await HJ_Utils.getStorage()
    
    HJ_Utils.log(5, "-- ResourcePage onFavorite userId : ", storage.user.userId, resource.id);

    var favorites = await fetch(config.api_url+'/setFavorite', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: resource.id,
        user_id: storage.user.userId
      })
    }).then(async data => {       
      HJ_Utils.log(5, "-- ResourcePage onFavorite data : ", data);
      var ret = await data.json();
      HJ_Utils.log(5, "-- ResourcePage onFavorite ret : ", ret);
      return ret;
    }).catch(e => {
      HJ_Utils.log(5, "-- ResourcePage onFavorite e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- ResourcePage onFavorite favorites : ", favorites);

    var setFavorites = this.props.actions.FavoriteActions.setFavorites;
    setFavorites( favorites.data );
  }


  async onLike( resource ) {
    var storage = await HJ_Utils.getStorage()

    var likes = await fetch(config.api_url+'/setLike', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: resource.id,
        user_id: storage.user.userId
      })
    }).then(async data => {       
      var ret = await data.json();
      HJ_Utils.log(5, "-- ResourcePage onLike ret : ", ret);
      return ret;
    }).catch(e => {
      HJ_Utils.log(5, "-- ResourcePage onLike e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- ResourcePage onLike likes : ", likes);

    var setLikes = this.props.actions.LikeActions.setLikes;
    setLikes( likes.data );

    this.setState({
      usageData: likes.usageData
    })
  }


  async onShareModal() {
    this.setState({
      visibleShareModal: true
    })
  }


  async onShare( resource, type ) {
    if( type == 'qq' ){
      var _pic = config.base_url + 'assets/images/logo-icon.png';
      var _title = resource.title;
      var _site = '慧教乐学';

      var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
      _shareUrl += 'url=' + config.webview_url + resource.id;   //参数url设置分享的内容链接|默认当前页location
      _shareUrl += '&showcount=0';      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
      _shareUrl += '&title=' + encodeURI(_title);    //参数title设置分享标题，可选参数
      _shareUrl += '&site=' + encodeURI(_site);   //参数site设置分享来源，可选参数
      _shareUrl += '&pics=' + encodeURI(_pic);   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
      
      Linking.openURL(_shareUrl);

      this.setState({
        visibleShareModal: false
      })
    } else if( type == 'weixin' ){
      this.setState({
        visibleShareModal: false,
        visibleQRModal: true
      })
    }
    
  }


  




  async onDownload() {
    var dirs = RNFetchBlob.fs.dirs.DocumentDir;
    var url = config.base_url + this.state.contentData.content_path;
    var ext = '';

    this.setState({
      loading: true
    });

    var contentFormat = HJ_Utils.getFiletypeFromURL(url);
    switch (contentFormat) {
      case 'mp4':
      case 'mp3':
      case 'wav':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'jpg':
      case 'jpeg':
      case 'doc':
      case 'docx':
      case 'ppt':
      case 'pptx':
      case 'pdf':
      case 'htm':
      case 'html':
          ext = contentFormat;
          break;
      default:
          if (this.state.contentData.content_path != '') {
            ext = 'zip';
            url += '.zip'
          }
          else ext = '';
          break;
    }
    
    if( ext == '' ){
      HJ_Utils.alert('Error', '资源无效。');
      this.setState({
        loading: false
      });
      return;
    }

    var downloadFile = await RNFetchBlob
    .config({
      fileCache : true,
      appendExt : ext
    })
    .fetch('GET', url, {
      //some headers ..
    })
    .then((res) => {
      // the temp file path
      return res.path();
    })
    .catch((err) => {
      this.setState({
        loading: false
      });
      HJ_Utils.alert('', '下载失败了！');
      return;
    })

    var storage = await HJ_Utils.getStorage()
    var downloads = storage.downloads;
    downloads.push( {
      url: url, 
      resource: this.state.resource,
      downloadFile: downloadFile,
    } );
    storage.downloads = downloads;
    HJ_Utils.setStorage( storage );

    this.setState({
      loading: false,      
      isDownload: true
    });

    HJ_Utils.alert('', '下载成功了！');
  }

  
  render() {
    var { resource, visibleShareModal, visibleQRModal, usageData, storage, isDownload } = this.state;

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var isLike = false;    
    var likes = this.props.likes;    
    for( var i=0; i<likes.length; i++ ){
      if( likes[i] == resource.id ){
        isLike = true;
        break;
      }
    }    
    
    var isFavorite = false;
    var favorites = this.props.favorites;
    for( var i=0; i<favorites.length; i++ ){
      if( favorites[i] == resource.id ){
        isFavorite = true;
        break;
      }
    }

    var whiteLists = ['*']
    if( Platform.OS == 'ios' ){
      whiteLists = ['http://', 'https://', 'file://'];
    }

    return (
      <View style={{width: LHOrigin, height:LW, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" hidden={true}/>        
        
        <View style={styles.mainContent}>
          <WebView
            containerStyle={{backgroundColor: '#f00'}}
            style={{flex: 1, width: LHOrigin, height: LW, }}
            ref={r => (this.webref = r)}
            originWhitelist={whiteLists}
            useWebKit={true}
            source={{
              uri: config.webview_url + resource.id,
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

        
        
        <TouchableOpacity 
          onPress={()=>{this.setState({visibleShareModal: false})}}
          style={[styles.shareWrap, {top: visibleShareModal ? 0:-10000}]}
        >
          <View style={[styles.headerRightBtn, {right: RateWH>2 ? 60:25, top: 38}]}>
            <Image source={require('../../assets/images/shiping9.png')} style={{width: 120, height: 120*164/281}}/>
          </View>
          <TouchableOpacity onPress={this.onShare.bind(this, resource, 'weixin')} style={[styles.headerRightBtn, {right: RateWH>2 ? 75:40, top: 58}]}>
            <Image source={require('../../assets/images/shiping7.png')} style={{width: 40, height: 40}}/>
          </TouchableOpacity>    
          <TouchableOpacity onPress={this.onShare.bind(this, resource, 'qq')} style={[styles.headerRightBtn, {right: RateWH>2 ? 130:95, top: 58}]}>
            <Image source={require('../../assets/images/shiping8.png')} style={{width: 40, height: 40}}/>
          </TouchableOpacity>   
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={()=>{this.setState({visibleQRModal: false})}}
          style={[styles.shareQRWrap, {top: visibleQRModal ? 0:-10000}]}
        >
          <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: 40}}>
            <QRCode value={config.webview_url + resource.id} size={256}/>
          </View>
          
        </TouchableOpacity>
        

        <View style={[styles.loading, {display: this.state.loading ? 'flex' : 'none', zIndex: this.state.loading ? 10000 : -1}]}>
          {loading}
        </View>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <Text style={styles.headerTxt}>{resource.title}</Text>
          </View>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.headerLeftBtn}>
            <Entypo name="chevron-thin-left" size={20} color="#fff"></Entypo>
          </TouchableOpacity>         

          <View onPress={()=>{this.props.navigation.goBack()}} style={[styles.headerRightBtn, {right: 20}]}>
            <Text style={{color: '#fff', fontSize: 13, paddingTop: 3}}>{HJ_Utils.checkValid(usageData) ? usageData.is_like : 0}</Text>
          </View>    
          <TouchableOpacity onPress={this.onLike.bind(this, resource)} style={[styles.headerRightBtn, {right: 50}]}>
            <AntDesign name="like1" size={20} color={isLike ? "#ff0":"#fff"}></AntDesign>
          </TouchableOpacity>    
          <TouchableOpacity onPress={this.onDownload.bind(this)} style={[styles.headerRightBtn, {right: 90, paddingTop: 2}]}>
            <Fontisto name="share" size={17} color={isDownload ? "#ff0":"#fff"}></Fontisto>
          </TouchableOpacity>    
          <TouchableOpacity onPress={this.onFavorite.bind(this, resource)} style={[styles.headerRightBtn, {right: 130, zIndex: 10000}]}>
            <FontAwesome name="star" size={20} color={isFavorite ? "#ff0":"#fff"}></FontAwesome>
          </TouchableOpacity>         
        </View>

      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
    favorites: state.favorite.favorites,
    likes: state.like.likes,
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
export default connect(mapStateToProps, mapDispatchToProps)(ResourcePage);