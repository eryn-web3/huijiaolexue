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

import styles from './HistoryPageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class HistoryPage extends React.Component {
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
      menu: 'read',
      likes: [],
      reads: []
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();

    var storage = await HJ_Utils.getStorage()

    var favorites = await fetch(config.api_url+'/getHistory', {
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
      HJ_Utils.log(5, "-- HistoryPage componentDidMount ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- HistoryPage componentDidMount e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- HistoryPage componentDidMount favorites : ", favorites);

    this.setState({
      likes: favorites.data.likeData, 
      reads: favorites.data.readData, 
      loading: false
    })
  }


  async goResourcePage( resource ) {
    this.props.navigation.navigate('ResourcePageProfile', resource);

  }

  
  render() {
    var { favorites, menu, reads, likes } = this.state;    

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var resourceElems = [];
    if( menu == 'read' ){
      for( var i=0; i<reads.length; i++ ){
        var resource = reads[i];
        var resourceElem = <TouchableOpacity key={'resource' + i} style={styles.resourceBtn} onPress={this.goResourcePage.bind(this, resource)}>          
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
  
        resourceElems.push( resourceElem );
      }    
    } else if( menu == 'like' ) {
      for( var i=0; i<likes.length; i++ ){
        var resource = likes[i];
        var resourceElem = <TouchableOpacity key={'resource' + i} style={styles.resourceBtn} onPress={this.goResourcePage.bind(this, resource)}>          
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
  
        resourceElems.push( resourceElem );
      }    
    }
    

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <TouchableOpacity style={[styles.headerBtn, {borderBottomWidth: menu=='read' ? 2:0}]} onPress={()=>{this.setState({menu: 'read'})}}>
              <Text style={[styles.headerTxt, {color: menu=='read' ? '#00cdaf':'#666'}]}>看过</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBtn, {borderBottomWidth: menu=='like' ? 2:0}]} onPress={()=>{this.setState({menu: 'like'})}}>
              <Text style={[styles.headerTxt, {color: menu=='like' ? '#00cdaf':'#666'}]}>赞过</Text>
            </TouchableOpacity>
          </View>  
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.headerLeftBtn}>
            <Icon name="chevron-thin-left" size={20} color="#333"></Icon>
            <Text style={{fontSize:16, color: '#666'}}>返回</Text>
          </TouchableOpacity>                  
        </View>
        
        <ScrollView style={styles.mainContent}>

          <View style={styles.resourceSectionElems}>
            {resourceElems}
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
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);