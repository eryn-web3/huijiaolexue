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
import FileViewer from 'react-native-file-viewer';

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

import styles from './DownloadPageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class DownloadPage extends React.Component {
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
      downloads: [], 
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();

    var storage = await HJ_Utils.getStorage();

    this.setState({
      downloads: storage.downloads, 
      loading: false
    })
  }


  async playWith( download ) {
    if( HJ_Utils.checkValid( download.downloadFile ) ){
      FileViewer.open(download.downloadFile, { showOpenWithDialog: true })
      .then(() => {
      })
      .catch(error => {
        HJ_Utils.alert('Error', '无法打开。')
      });
    }
  }

  
  render() {
    var { downloads } = this.state;    

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var resourceElems = [];
    for( var i=0; i<downloads.length; i++ ){
      var resource = downloads[i].resource;
      var resourceElem = <TouchableOpacity key={'resource' + i} style={styles.resourceBtn} onPress={this.playWith.bind(this, downloads[i])}>          
                          <Image source={{uri: config.base_url + resource.icon_path}} style={styles.resourceImg}/>
                          <View style={{height: 105, width: LW-140-30, marginLeft: 10}}>
                            <Text style={styles.resourceTitleTxt}>{resource.title}</Text>
                            <View style={styles.resourceDesc}>
                              <Text style={styles.resourceDescTxt}>{resource.subject}</Text>
                              <Text style={[styles.resourceDescTxt, {marginLeft: 30}]}>{resource.term}</Text>
                            </View>
                            <Text style={styles.resourceTimeTxt}>{resource.update_time}</Text>
                          </View>                          
                        </TouchableOpacity>

      resourceElems.push( resourceElem );
    }    

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <Text style={styles.headerTxt}>我的缓存</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(DownloadPage);