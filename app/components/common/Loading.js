import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Animated,
  Easing,
  Text
} from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;

export default class Loading extends React.Component {

  loadingAnimation () {
    this.state.loadingAnim.setValue(0)
    Animated.timing(
      this.state.loadingAnim,
      {
        toValue: 360,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => {
      this.loadingAnimation()
    })
  }


  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor(props) {
    super(props);
    
    this.state = {  
      loadingAnim: new Animated.Value(0)
    }    
    
  }


  /**
   * @method componentDidMount
   * @description This function is called component is loaded.
   */
  async componentDidMount() {
    this.loadingAnimation();
  }


  /**
   * @method render
   * @description This is renderfunction
   */
  render() {
    var { type } = this.props;
    var { loadingAnim } = this.state;

    return (
      <View style={styles.loadinglStyle}>
        <View style={{paddingTop: 35, paddingBottom: 15, paddingHorizontal: 20, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent:'center', alignItems: 'center'}}>
          <Animated.View style={{ width: 30, height: 30, transform: [{rotate: loadingAnim.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "360deg"]
          }) }] }}>
            <Image 
              source={require('../../assets/images/loading.png')} 
              style={{width: 30, height: 30 }} />
          </Animated.View>
          <Text style={{fontSize: 15, color: '#fff', marginTop: 20}}>请稍等一下</Text>
        </View>        
        
      </View>
      
    );
  }

}

const styles = StyleSheet.create({
  loadinglStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
