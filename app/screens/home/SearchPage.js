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
  InteractionManager,
  BackHandler
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/AntDesign';
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

import styles from './SearchPageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class SearchPage extends React.Component {
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
      searchTxt: '',
      searchData: [], 
    }

    this.onChangeSearchTxt = this.onChangeSearchTxt.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

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


  async onChangeSearchTxt( searchTxt ) {
    this.setState({
      searchTxt: searchTxt
    });

    
  }


  async searchSubmit() {
    var { searchTxt } = this.state;
    HJ_Utils.log(5, "-- SearchPage searchSubmit searchTxt : ", searchTxt);

    this.setState({
      loading: true
    });

    var searchData = await fetch(config.api_url+'/getFilteredContents', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search_txt: searchTxt
      })
    }).then(async data => {       
      var ret = await data.json();
      HJ_Utils.log(5, "-- SearchPage searchSubmit ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- SearchPage searchSubmit e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- SearchPage searchSubmit searchData : ", searchData);

    this.setState({
      searchData: searchData.data.contentData, 
      loading: false
    })
  }


  async goResourcePage( resource ) {
    this.props.navigation.navigate('ResourcePageHome', resource);

  }
  
  
  render() {
    var { searchData, searchTxt } = this.state;

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }
 
    var resourceElems = [];
    for( var i=0; i<searchData.length; i++ ){
      var resource = searchData[i];
      var resourceElem = <TouchableOpacity key={'resource' + i} style={styles.resourceBtn} onPress={this.goResourcePage.bind(this, resource)}>          
                          <Image source={{uri: config.base_url + resource.icon_path}} style={styles.resourceImg}/>
                          <Text style={styles.resourceTitleTxt}>{resource.title}</Text>
                          <View style={styles.resourceDesc}>
                            <Text style={styles.resourceDescTxt}>{resource.subject}</Text>
                            <Text style={[styles.resourceDescTxt, {marginLeft: 30}]}>{resource.term}</Text>
                          </View>
                        </TouchableOpacity>
      resourceElems.push( resourceElem );
    }

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <View style={styles.searchBox}>
              <Icon name='search1' size={18} style={{position: 'absolute', left: 10, top: 8, color: '#666'}}/> 
              <TextInput
                style={[styles.searchInputTxt]}
                autoFocus={true}
                placeholder='搜索关键字'
                placeholderTextColor="#666"
                underlineColorAndroid="#ffffff00"
                autoCorrect={false}
                onChangeText={(text) => this.onChangeSearchTxt(text)}  
                returnKeyLabel='搜索'
                returnKeyType='search'
                onSubmitEditing={this.searchSubmit}/>
              
            </View>
          </View>  
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.headerRightBtn}>
            <Text style={styles.headerRightBtnTxt,{}}>取消</Text>
          </TouchableOpacity>                  
        </View>
        
        <ScrollView style={[styles.mainContent, {backgroundColor: '#fff'}]}>
          
          <View style={styles.resourceSection}>
            <View style={styles.resourceSectionElems}>
              {resourceElems}
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
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);