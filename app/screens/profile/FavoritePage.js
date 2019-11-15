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
  FlatList,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import HJ_Utils from '../../utils/HJUtils'
import Carousel from 'react-native-looped-carousel';
import Orientation from 'react-native-orientation-locker';

// custom component
import Loading from '../../components/common/Loading';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/user';

// constant
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;
import config from '../../constants/config';

import styles from './FavoritePageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class FavoritePage extends React.Component {
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
      favorites: [], 
      curPage: 0,
    }

    this.onLoadMoreItems = this.onLoadMoreItems.bind(this);
    this.makeElem = this.makeElem.bind(this);
  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    var storage = await HJ_Utils.getStorage()

    var favorites = await fetch(config.api_url+'/getFavorite', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: storage.user.userId,
        pid: 0,
        pcnt: config.pageCount
      })
    }).then(async data => {       
      var ret = await data.json();
      HJ_Utils.log(5, "-- FavoritePage componentDidMount ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- FavoritePage componentDidMount e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- FavoritePage componentDidMount favorites : ", favorites);

    this.setState({
      curPage: 0,
      favorites: favorites.data.favoriteData, 
      loading: false
    })
  }


  /**
   * @method componentWillUnmount
   * @description This function is called component is loaded.
   */
  async componentWillUnmount() {
    this.backHandler.remove()
  }


  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }


  async goResourcePage( resource ) {
    this.props.navigation.navigate('ResourcePageProfile', resource);

  }


  async onLoadMoreItems(){
    var { favorites, curPage } = this.state;   
    
    this.setState({
      loading: true
    })
    
    var storage = await HJ_Utils.getStorage()
    
    var morefavorites = await fetch(config.api_url+'/getFavorite', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: storage.user.userId,
        pid: curPage+1,
        pcnt: config.pageCount
      })
    }).then(async data => {       
      var ret = await data.json();
      HJ_Utils.log(5, "-- FavoritePage onLoadMoreItems ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- FavoritePage onLoadMoreItems e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- FavoritePage onLoadMoreItems morefavorites : ", morefavorites, curPage);

    this.setState({
      curPage: curPage+1,
      favorites: [...favorites, ...morefavorites.data.favoriteData], 
      loading: false
    })
  }


  makeElem( resource ){
    var resourceElem = <TouchableOpacity style={styles.resourceBtn} onPress={this.goResourcePage.bind(this, resource)}>          
                    <Image source={{uri: config.base_url + resource.icon_path}} style={styles.resourceImg}/>
                    <View style={{height: 105, width: LW-140-30, marginLeft: 10}}>
                      <Text style={styles.resourceTitleTxt}>{resource.title}</Text>
                      <View style={styles.resourceDesc}>
                        <Text style={styles.resourceDescTxt}>{resource.subject}</Text>
                        <Text style={[styles.resourceDescTxt, {marginLeft: 30}]}>{resource.term}</Text>
                      </View>
                      <Text style={styles.resourceTimeTxt}>{resource.action_time}</Text>
                    </View>                          
                  </TouchableOpacity>
    return resourceElem;
  }


  
  render() {
    var { favorites } = this.state;    

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <Text style={styles.headerTxt}>我的收藏</Text>
          </View>  
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.headerLeftBtn}>
            <Icon name="chevron-thin-left" size={20} color="#333"></Icon>
            <Text style={{fontSize:16, color: '#666'}}>返回</Text>
          </TouchableOpacity>                  
        </View>
        
        <View style={styles.mainContent}>
          <FlatList 
            style={styles.resourceSectionElems}
            onEndReached={this.onLoadMoreItems}
            onEndReachedThreshold={0.01}
            keyExtractor={(item, index)=>''+item.id + '_' + index}
            data={favorites}
            renderItem={({item})=>this.makeElem(item)}
            bounces={false}
            ListEmptyComponent={()=>
              <View style={styles.emptyList}>
                <Text style={styles.emptyListTxt}>没有收藏</Text>
              </View>}
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
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);