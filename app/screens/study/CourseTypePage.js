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

import styles from './CourseTypePageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class CourseTypePage extends React.Component {
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
      courseTypeInfo: [], 
      title: ''
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);


    var id = this.props.navigation.state.params;
    HJ_Utils.log(5, "-- CourseTypePage componentDidMount id : ", id);

    var courseTypeInfo = await fetch(config.api_url+'/getCourseTypeInfo', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    }).then(async data => {       
      var ret = await data.json();
      HJ_Utils.log(5, "-- CourseTypePage componentDidMount ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- CourseTypePage componentDidMount e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- CourseTypePage componentDidMount courseTypeInfo : ", courseTypeInfo);

    this.setState({
      courseTypeInfo: courseTypeInfo.data.contentData, 
      title: courseTypeInfo.data.coursetypeData[0].title,
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
    this.props.navigation.navigate('ResourcePageStudy', resource);

  }

  
  render() {
    var { courseTypeInfo, title } = this.state;    

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var resourceElems = [];
    for( var i=0; i<courseTypeInfo.length; i++ ){
      var resource = courseTypeInfo[i];
      var resourceElem = <TouchableOpacity key={'resource' + i} style={styles.resourceBtn} onPress={this.goResourcePage.bind(this, resource)}>          
                          <Image source={{uri: config.base_url + resource.icon_path}} style={styles.resourceImg}/>
                          <Text style={styles.resourceTitleTxt}>{HJ_Utils.textEllipsis( resource.title, 10)}</Text>
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
            <Text style={styles.headerTxt}>{title}</Text>
          </View>  
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.headerLeftBtn}>
            <Icon name="chevron-thin-left" size={20} color="#333"></Icon>
            <Text style={{fontSize:16, color: '#666'}}>返回</Text>
          </TouchableOpacity>                  
        </View>
        
        <ScrollView style={styles.mainContent}>

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
export default connect(mapStateToProps, mapDispatchToProps)(CourseTypePage);