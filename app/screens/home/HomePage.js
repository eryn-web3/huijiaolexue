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

import styles from './HomePageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class HomePage extends React.Component {
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
      recommendData: [], 
      subjectData: [], 
      bannerData: []
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
    HJ_Utils.log(5, "-- HomePage componentDidMount storage : ", storage);

    var homeInfo = await fetch(config.api_url+'/getHomeInfo', {
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
      HJ_Utils.log(5, "-- HomePage componentDidMount ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- HomePage componentDidMount e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- HomePage componentDidMount homeInfo : ", homeInfo);

    this.setState({
      recommendData: homeInfo.data.recommendData, 
      subjectData: homeInfo.data.subjectData, 
      bannerData: homeInfo.data.bannerData,
      loading: false
    })

    var setFavorites = this.props.actions.FavoriteActions.setFavorites;
    setFavorites( homeInfo.data.favoriteData );
    var setLikes = this.props.actions.LikeActions.setLikes;
    setLikes( homeInfo.data.likeData );
  }


  async goResourcePage( resource ) {
    this.props.navigation.navigate('ResourcePageHome', resource);

  }


  goStudyPage( subject ){
    this.props.navigation.navigate('StudyPage', subject);
  }

  
  render() {
    var { recommendData, subjectData, bannerData } = this.state;

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var bannerElems = []
    for( var i=0; i<bannerData.length; i++ ){
      var banner = bannerData[i];
      bannerElems.push(
        <View key={'banner' + i}>
          <Image source={{uri: config.upload_url + banner.icon_path_m}} style={{width: LW-40, height: (LW-40)/2 }}/>
        </View>
      )
    }

    var subjectElems = []
    for( var i=0; i<subjectData.length; i++ ){
      var subject = subjectData[i];
      subjectElems.push(
        <TouchableOpacity key={'subject' + i} style={styles.subjectBtn} onPress={this.goStudyPage.bind(this, subject)}>          
          <Image source={{uri: config.base_url + 'assets/images/mobile/' + subject.image_icon + '.png'}} style={{width: 30, height: 30 }}/>
          <Text style={styles.subjectBtnTxt}>{subject.title}</Text>
        </TouchableOpacity>
      )
    }

    var type2Elems = [];
    var type3Elems = [];
    var type4Elems = [];
    var type5Elems = [];
    var type6Elems = [];
    for( var i=0; i<recommendData.length; i++ ){
      var resource = recommendData[i];
      var resourceElem = <TouchableOpacity key={'resource' + i} style={styles.resourceBtn} onPress={this.goResourcePage.bind(this, resource)}>          
                          <Image source={{uri: config.base_url + resource.image_icon}} style={styles.resourceImg}/>
                          <Text style={styles.resourceTitleTxt}>{HJ_Utils.textEllipsis( resource.title, 10)}</Text>
                          <View style={styles.resourceDesc}>
                            <Text style={styles.resourceDescTxt}>{resource.subject}</Text>
                            <Text style={[styles.resourceDescTxt, {marginLeft: 30}]}>{resource.term}</Text>
                          </View>
                        </TouchableOpacity>

      if( resource.type == 2 ) type2Elems.push( resourceElem );
      else if( resource.type == 3 ) type3Elems.push( resourceElem );
      else if( resource.type == 4 ) type4Elems.push( resourceElem );
      else if( resource.type == 5 ) type5Elems.push( resourceElem );
      else if( resource.type == 6 ) type6Elems.push( resourceElem );
    }    

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" translucent={false}/>

        {/* <View style={{position: 'absolute', left: 0, top: 0, width: LW, height: RateWH>2 ? 85:70, backgroundColor: '#000'}}>
          <View style={{width: LW, height: RateWH>2 ? 85:70, justifyContent: 'center', paddingTop: RateWH>2 ? 30:10}}>
            <Text style={{textAlign: 'center', color: '#0f0', fontSize: 20}}>History</Text>
          </View>  
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{position: 'absolute', left: 20, top: RateWH>2 ? 40:25}}>
            <Icon name="angle-left" size={30} color="#0f0"></Icon>
          </TouchableOpacity>
        </View> */}
        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <Text style={styles.headerTxt}>首页</Text>
          </View>  
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchPage')}} style={styles.headerRightBtn}>
            <Icon name="search1" size={24} color="#333"></Icon>
          </TouchableOpacity>                  
        </View>
        
        <ScrollView style={styles.mainContent}>
          <View style={styles.carouselWrap}>
            {
              bannerElems.length > 0 ?
              <Carousel
                delay={4000}
                style={{width: LW-40, height: (LW-40)*0.4}}
                autoPlay={false}
                bullets
                onAnimateNextPage={(p)=>{}}
              >
                {bannerElems}
              </Carousel> : 
              <View><Text></Text></View>
            }
          </View>
          

          <View style={styles.subjectBtnWrap}>
            {subjectElems}
          </View>

          <View style={styles.resourceSection}>
            <View style={{paddingHorizontal: 5}}>
              <Text style={styles.resourceSectionTitle}>资源精选</Text>
              {/* <TouchableOpacity style={styles.moreBtn}>
                <Text style={styles.moreBtnTxt}>更多</Text>
              </TouchableOpacity> */}
            </View>            
            <View style={styles.resourceSectionElems}>
              {type2Elems}
            </View>
            
          </View>

          <View style={styles.resourceSection}>
            <View style={{paddingHorizontal: 5}}>
              <Text style={styles.resourceSectionTitle}>小学语文</Text>
              {/* <TouchableOpacity style={styles.moreBtn}>
                <Text style={styles.moreBtnTxt}>更多</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.resourceSectionElems}>
              {type3Elems}
            </View>
            
          </View>

          <View style={styles.resourceSection}>
            <View style={{paddingHorizontal: 5}}>
              <Text style={styles.resourceSectionTitle}>小学数学</Text>
              {/* <TouchableOpacity style={styles.moreBtn}>
                <Text style={styles.moreBtnTxt}>更多</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.resourceSectionElems}>
              {type4Elems}
            </View>
            
          </View>

          <View style={styles.resourceSection}>
            <View style={{paddingHorizontal: 5}}>
              <Text style={styles.resourceSectionTitle}>初中数学</Text>
              {/* <TouchableOpacity style={styles.moreBtn}>
                <Text style={styles.moreBtnTxt}>更多</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.resourceSectionElems}>
              {type5Elems}
            </View>
            
          </View>

          <View style={styles.resourceSection}>
            <View style={{paddingHorizontal: 5}}>
              <Text style={styles.resourceSectionTitle}>初中物理</Text>
              {/* <TouchableOpacity style={styles.moreBtn}>
                <Text style={styles.moreBtnTxt}>更多</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.resourceSectionElems}>
              {type6Elems}
            </View>
            
          </View>
        </ScrollView>
        

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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);