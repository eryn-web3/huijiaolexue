import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UB_UTILS from '../../utils/SWUtils'

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;

export default class NotifyAlert extends React.Component {


  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor(props) {
    super(props);

    this.state = {
      visibleAlert: this.props.visibleAlert,
      title: this.props.title, 
      description: this.props.description, 
      type: this.props.type,
      okText: this.props.okText,
      cancelText: this.props.cancelText,
      onOK: this.props.onOK,
      onCancel: this.props.onCancel,
      fadeAnim: new Animated.Value(0)
    }    

    this.onOK = this.onOK.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  componentDidMount() {
    
  }


  /**
   * @method componentWillReceiveProps
   * @description This function is called when props is passed to this element
   * @param props
   */
  async componentWillReceiveProps( nextProps ) {
    this.setState({
      visibleAlert: nextProps.visibleAlert,
      title: nextProps.title, 
      description: nextProps.description, 
      type: nextProps.type,
      okText: nextProps.okText,
      cancelText: nextProps.cancelText,
      onOK: nextProps.onOK,
      onCancel: nextProps.onCancel,
    });

    Animated.timing(this.state.fadeAnim, {
      toValue: nextProps.visibleAlert ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }


  onOK(){
    this.state.onOK();
  }


  onCancel(){
    this.state.onCancel();
  }


  /**
   * @method render
   * @description This is renderfunction
   */
  render() {    
    var { visibleAlert, title, description, type, fadeAnim, okText, cancelText } = this.state;

    var isOK = false;
    var isCANCEL = false
    if( type == 'CANCEL_ONLY' ){
      isCANCEL = true;
      isOK = false;
    } else if( type == 'OK_ONLY' ){
      isCANCEL = false;
      isOK = true;
    } else if( type == 'OK_CANCEL' ){
      isCANCEL = true;
      isOK = true;
    } else {
      isCANCEL = false;
      isOK = false;
    }

    return (
      <Animated.View style={[styles.alertContainer, {
        top: visibleAlert ? 0 : -LH,
        opacity: fadeAnim
      }]}>
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertText}>{description}</Text>
          <View style={styles.actionBox}>
            <TouchableOpacity onPress={this.onOK} style={[styles.actionBtn, {display: isOK ? 'flex' : 'none'}]}>
              <Text style={styles.actionBtnText}>{okText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCancel} style={[styles.actionBtn, {display: isCANCEL ? 'flex' : 'none'}]}>
              <Text style={styles.actionBtnText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: LW,
    height: LH,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertBox: {
    width: LW-80,
    padding: 20,
    backgroundColor: Colors.alertBgColor
  },
  alertTitle: {
    fontSize: Layout.F.H2,
    color: Colors.whiteColor,
  },
  alertText: {
    marginTop: 20,
    fontSize: Layout.F.p2,
    color: Colors.whiteColor,
  },
  actionBox: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  actionBtn: {
    marginLeft: 40
  },
  actionBtnText: {
    fontSize: Layout.F.H2,
    color: '#7dbeb8',
  }
  
});
