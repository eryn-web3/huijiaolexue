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
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

import styles from './SettingPageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class SettingPage extends React.Component {
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
      favorites: [], 
      nameTxt: ''
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    var storage = await HJ_Utils.getStorage()

    this.setState({
      nameTxt: storage.user.userName
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


  async onChangeSearchTxt( nameTxt ) {
    this.setState({
      nameTxt: nameTxt
    });
  }


  async saveName(){
    var { nameTxt } = this.state;

    this.setState({
      loading: true
    })

    var storage = await HJ_Utils.getStorage()

    await fetch(config.api_url+'/setUserName', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: storage.user.userId,
        username: nameTxt
      })
    }).then(async data => {
      var ret = await data.json();
      HJ_Utils.log(5, "-- SettingPage saveName ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- SettingPage saveName e : ", e);
      return null;
    });

    storage.user.userName = nameTxt;
    HJ_Utils.setStorage( storage );

    this.setState({
      loading: false
    })
  }


  onClear() {
    this.setState({
      nameTxt: ''
    })
  }

  
  render() {
    var { nameTxt } = this.state;    

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <Text style={styles.headerTxt}>设置名字</Text>
          </View>  
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.headerLeftBtn}>
            <Icon name="chevron-thin-left" size={20} color="#333"></Icon>
            <Text style={{fontSize:16, color: '#666'}}>取消</Text>
          </TouchableOpacity>    
          <TouchableOpacity onPress={this.saveName.bind(this)} style={styles.headerRightBtn}>
            <Text style={{fontSize:16, color: '#fff'}}>完成</Text>
          </TouchableOpacity>              
        </View>
        
        <View style={styles.mainContent}>
          <View style={styles.inputWrap}>
            <TextInput
              style={[styles.nameInputTxt]}
              autoCorrect={false}
              value={nameTxt}
              onChangeText={(text) => this.onChangeSearchTxt(text)}  
            />
            <TouchableOpacity style={styles.clearBtn} onPress={this.onClear.bind(this)}>
              <AntDesign name="closecircle" size={16} color="#ccc"></AntDesign>
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
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);