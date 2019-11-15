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
  Button,
  BackHandler
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import HJ_Utils from '../../utils/HJUtils'
import Carousel from 'react-native-looped-carousel';
import {
  ScrollIntoView, // enhanced View container
  wrapScrollView, // simple wrapper, no config
  wrapScrollViewConfigured, // complex wrapper, takes a config
} from 'react-native-scroll-into-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

import styles from './StudyPageStyle'

// mock
// import bannerData from '../../mock/banners';
// import subjectData from '../../mock/subjects';
// import homeResources from '../../mock/homeResources';


 

class StudyPage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  courseTypeElems = [];
  courseTypeMenuElems = [];
  customScrollView = <View><Text> </Text></View>

  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      subjectData: [], 
      termData: [],
      courseTypeData: [],
      contentData: [],
      activeSubjectIndex: 0,
      activeTermIndex: 0,
      visibleSubjectModal: false,
      visibleCourseTypeModal: false,
      selectScrollIntoViewRef: null
    }

  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    Orientation.lockToPortrait();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    var info = await fetch(config.api_url+'/getSubjectInfo', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async data => {       
      var ret = await data.json();
      HJ_Utils.log(5, "-- StudyPage componentDidMount ret : ", ret);
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- StudyPage componentDidMount e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- StudyPage componentDidMount info : ", info);

    this.createCourseTypeElems(info.data.courseTypeData, info.data.contentData);

    this.setState({
      subjectData: info.data.subjectData, 
      termData: info.data.termData, 
      courseTypeData: info.data.courseTypeData, 
      contentData: info.data.contentData, 
      activeSubjectIndex: 0,
      activeTermIndex: 0,
      loading: false
    })

    var subject = this.props.navigation.state.params;
    if( HJ_Utils.checkValid( subject ) ){
      for( var i=0; info.data.subjectData; i++ ){
        if( info.data.subjectData[i].id == subject.id ){
          this.selectSubject( i );
          break;
        }
      }
    }

    var that = this;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      var subject = that.props.navigation.state.params;
      if( HJ_Utils.checkValid( subject ) ){
        for( var i=0; info.data.subjectData; i++ ){
          if( info.data.subjectData[i].id == subject.id ){
            this.selectSubject( i );
            break;
          }
        }
      }
    });
  }


  componentWillUnmount() {
    if( HJ_Utils.checkValid( this.focusListener ) ){
      this.focusListener.remove();
    }    
    this.backHandler.remove()
  }


  handleBackPress = () => {
    this.props.navigation.dispatch({type: 'Reset', index: 0, actions: [{ type: 'Navigate', routeName:'StudyPage'}]})
    this.props.navigation.navigate('HomePage')
    return true;
  }


  async selectSubject( index ) {
    var { subjectData } = this.state;
    var subject = subjectData[index];

    this.setState({
      loading: true
    })

    var info = await fetch(config.api_url+'/getSubjectInfo', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: subject.id
      })
    }).then(async data => {       
      var ret = await data.json();
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- StudyPage selectSubject e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- StudyPage selectSubject info : ", info);

    this.createCourseTypeElems(info.data.courseTypeData, info.data.contentData);

    this.setState({
      termData: info.data.termData, 
      courseTypeData: info.data.courseTypeData, 
      contentData: info.data.contentData, 
      activeSubjectIndex: index,
      activeTermIndex: 0,
      visibleSubjectModal: false,
      loading: false
    })
  }


  async selectTerm( index ) {
    var { termData } = this.state;
    var term = termData[index];

    this.setState({
      loading: true
    })

    var info = await fetch(config.api_url+'/getTermInfo', {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: term.id
      })
    }).then(async data => {       
      var ret = await data.json();
      return ret;
    })
    .catch(e => {
      HJ_Utils.log(5, "-- StudyPage selectTerm e : ", e);
      return null;
    });
    HJ_Utils.log(5, "-- StudyPage selectTerm info : ", info);
    
    if( HJ_Utils.checkValid( info ) ){
      this.createCourseTypeElems(info.data.courseTypeData, info.data.contentData);

      this.setState({
        courseTypeData: info.data.courseTypeData,       
        contentData: info.data.contentData, 
        activeTermIndex: index,
        visibleSubjectModal: false,
        loading: false
      })
    } else {
      this.state({
        loading: false
      })
    }
  }


  scrollToCourseType( scrollIntoViewRef ){
    scrollIntoViewRef.current.scrollIntoView({ align: 'top' })
  }


  goCourseType( id ) {
    this.props.navigation.navigate('CourseTypePage', id)
  }


  async nextPage( courseType ) {    
    var { courseTypeData, contentData } = this.state;

    for( var i=0; i<courseTypeData.length; i++ ){
      if( courseTypeData[i].id == courseType.id ){
        var temp = contentData.filter(function(a){ return a.course_type_id == courseType.id });
        courseTypeData[i].startIdx = courseTypeData[i].startIdx+4 >= temp.length ? 0 : courseTypeData[i].startIdx+4;        
      }
    }
    
    this.createCourseTypeElems(courseTypeData, contentData, courseType);


    await this.setState({
      courseTypeData: courseTypeData
    })
  }

  createCourseTypeElems( courseTypeData, contentData, selectCourseType ){
    this.courseTypeElems = [];
    this.courseTypeMenuElems = [];
    var ret = null;
    for( var i=0; i<courseTypeData.length; i++ ){
      var courseType = courseTypeData[i];
      var resourcesElem = [];
      var startIdx = parseInt(courseTypeData[i].startIdx)
      
      var contentDataTmp = contentData.filter(function(a){ return a.course_type_id == courseType.id; });

      for( var j=0; j<4; j++ ){
        var idx = courseType.startIdx + j;
        if(idx >= contentDataTmp.length) break;

        var content = contentDataTmp[idx];
        resourcesElem.push(
          <TouchableOpacity key={'resource' + i + ':' + j} style={styles.resourceBtn} onPress={this.goResourcePage.bind(this, content)}>          
            <Image source={{uri: config.base_url + content.icon_path}} style={styles.resourceImg}/>
            <Text style={styles.resourceTitleTxt}>{HJ_Utils.textEllipsis( content.title, 10)}</Text>
            <View style={styles.resourceDesc}>
              <Text style={styles.resourceDescTxt}>{content.subject}</Text>
              <Text style={[styles.resourceDescTxt, {marginLeft: 30}]}>{content.term}</Text>
            </View>
          </TouchableOpacity>
        )
      }

      var scrollIntoViewRef = React.createRef();

      var isScroll = false;
      if( HJ_Utils.checkValid(selectCourseType) && selectCourseType.id == courseType.id ){
        isScroll = true;
      }
      this.courseTypeElems.push(
        <ScrollIntoView style={styles.resourceSection} ref={scrollIntoViewRef} immediate={isScroll}>
          <View style={{paddingHorizontal: 5}}>
            <Text style={styles.resourceSectionTitle}>{courseType.title}</Text>
          </View>            
          <View style={styles.resourceSectionElems}>
            {resourcesElem.length > 0 ? resourcesElem : <View><Text> </Text></View>}
          </View>       
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity key={'resourcesElemAll' + i} style={[styles.resourceSectionBtn, {borderRightWidth: 1, borderRightColor: '#ccc'}]} onPress={this.goCourseType.bind(this, courseType.id)}>      
              <Text style={styles.resourceSectionBtnTxt}>查看全部</Text>
            </TouchableOpacity>
            <TouchableOpacity key={'resourcesElemPage' + i} style={styles.resourceSectionBtn} onPress={this.nextPage.bind(this, courseType)}>      
              <Text style={styles.resourceSectionBtnTxt}>换一批</Text>
            </TouchableOpacity>
          </View>     
        </ScrollIntoView>
      )

      this.courseTypeMenuElems.push(
        <TouchableOpacity key={'courseTypeMenuElems' + i} style={styles.courseTypeMenuElem} onPress={this.scrollToCourseType.bind(this, scrollIntoViewRef)}>
          <Text style={styles.courseTypeMenuElemTxt}>{courseType.title}</Text>
        </TouchableOpacity>
      )

      if( HJ_Utils.checkValid(selectCourseType) && selectCourseType.id == courseType.id ){
        var setSelectScrollIntoViewRef = function ( selectScrollIntoViewRef ) {
          selectScrollIntoViewRef.current.scrollIntoView({ align: 'top' });
        }
        ret = setSelectScrollIntoViewRef.bind( this, scrollIntoViewRef );
      }
    }

    const CustomScrollView = wrapScrollView(KeyboardAwareScrollView);   
    this.customScrollView = <CustomScrollView>
                              {this.courseTypeElems.length > 0 ? this.courseTypeElems : <ScrollIntoView><Text> </Text></ScrollIntoView>}
                            </CustomScrollView>

    return ret;
  }


  async goResourcePage( resource ) {
    this.props.navigation.navigate('ResourcePageStudy', resource);

  }

  
  render() {
    var { subjectData, termData, courseTypeData, contentData, activeSubjectIndex, activeTermIndex, visibleSubjectModal, visibleCourseTypeModal } = this.state;

    var loading = <Text> </Text>;
    if( this.state.loading ){
      loading = <Loading type="full"/>;
    }

    var subjectElems = []
    for( var i=0; i<subjectData.length; i++ ){
      var subject = subjectData[i];
      subjectElems.push(
        <TouchableOpacity key={'subject' + i} style={[styles.subjectBtn, {backgroundColor: activeSubjectIndex==i ? '#00cdaf':'#fff'}]} onPress={this.selectSubject.bind(this, i)}>   
          <Text style={styles.subjectBtnTxt}>{subject.title}</Text>
        </TouchableOpacity>
      )
    }

    var termElems = [];
    for( var i=0; i<termData.length; i++ ){
      var term = termData[i];
      termElems.push(
        <TouchableOpacity style={[styles.termElem, {borderBottomWidth: activeTermIndex==i ? 2:0}]} key={'term'+i} onPress={this.selectTerm.bind(this, i)}>          
          <Text style={[styles.termElemText, {color: activeTermIndex==i ? '#00cdaf':'#333'}]}>{term.title}</Text>
        </TouchableOpacity>
      )
    }    
    
     

    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>

        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{this.setState({visibleSubjectModal: true})}}>
              <Text style={{fontSize: 18, color: '#333', fontWeight: 'bold'}}>{HJ_Utils.checkValid(subjectData[activeSubjectIndex]) ? subjectData[activeSubjectIndex].title : ''}</Text>
              <Icon name="chevron-thin-down" size={20} color="#333" style={{marginLeft: 10, marginTop: 3}}></Icon>
            </TouchableOpacity>
            <View style={styles.termSec}>
              <ScrollView style={styles.termScroll} horizontal={true} contentContainerStyle={{justifyContent: 'center'}}>
                {termElems}
              </ScrollView>
              <View style={styles.whiteGradient}>
                <Image
                  source={require('../../assets/images/WhiteGradient.png')}
                  style={{width: 30, height: 34}}/>
              </View>
            </View>
            <TouchableOpacity style={styles.contentTypeMenuBtn} onPress={()=>{this.setState({visibleCourseTypeModal: true})}}>
              <EvilIcons name="navicon" size={28} color="#333"></EvilIcons>
            </TouchableOpacity>
          </View>  
        </View>
        
        <View style={styles.mainContent}>
          {this.customScrollView}          
          <TouchableOpacity 
            onPress={()=>{this.setState({visibleCourseTypeModal: false})}}
            style={[styles.subjectBtnWrap, {top: visibleCourseTypeModal ? 0:-10000}]}
          >
            <ScrollView style={styles.courseTypeMenuWrap}>
              {this.courseTypeMenuElems.length > 0 ? this.courseTypeMenuElems : <ScrollIntoView><Text> </Text></ScrollIntoView>}
            </ScrollView>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={()=>{this.setState({visibleSubjectModal: false})}}
          style={[styles.subjectBtnWrap, {top: visibleSubjectModal ? 0:-10000}]}
        >
          <View>
            {subjectElems}
          </View>
        </TouchableOpacity>        

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
export default connect(mapStateToProps, mapDispatchToProps)(StudyPage);