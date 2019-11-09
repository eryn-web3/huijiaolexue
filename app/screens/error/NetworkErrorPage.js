import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HJ_Utils from '../../utils/HJUtils'

// constant
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;
import config from '../../constants/config';
 

export default class NetworkErrorPage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  timer: null;

  timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  }

  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    var that = this;
    this.timer = setInterval( async function(){
      var connectivity = await that.timeout(5000, fetch('https://www.google.com', {
        method: 'GET',
        timeout: 5000
      })).then(data => { return data })
      .catch(e => {
        HJ_Utils.log(5, "-- NetworkErrorPage componentDidMount connectivity e : ", e);
        return null;
      });

      HJ_Utils.log(5, "-- NetworkErrorPage componentDidMount connectivity : ", connectivity);

      if( !connectivity || connectivity.status !== 200 ){
        
      } else {
        clearInterval(this.timer);
        that.props.navigation.state.params.onConnectivity();
        that.props.navigation.goBack(); 
      }
    }, 7000);

    
  }


  render() {
    return (
      <View style={{width: LW, height:LH, flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <View
          style={styles.backgroundGrad}>
          <View style={styles.mainContent}>
            <View style={styles.topImg}>
              
            </View>
            <View style={styles.content}>
              <Image
                source={require('../../assets/images/network_error.png')} 
                resizeMode={'cover'}
                style={{width: 50, height: 50, position: 'absolute', left: LW/2-25, top: 0}}
              />
              <Text style={{color: '#2ee6f8', fontSize: 16, textAlign: "center", position: 'absolute', top: 60}}>Network Error</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute', 
    left: 0, 
    top: 0, 
    width: LW,
    height: LH,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',   
  },
  backgroundGrad: {
    alignItems: 'center', flex: 1, width: LW
  },  
  apiContent: {
    flexDirection: 'column',
    width: LW,
    height: LH,
  },
  mainContent: {
    flexDirection: 'column',
    width: LW,
    height: LH,
  },
  topImg: {
    flex: 4,
    alignItems: 'center',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    paddingTop: 60
  },
});
