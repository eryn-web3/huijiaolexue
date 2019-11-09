import { Dimensions, Platform, StatusBar  } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const RateWH = height/width;
const headerHeight = Platform.OS === 'ios' ? (RateWH>2 ? 100:85) : 65;
const headerPadding = Platform.OS === 'ios' ? (RateWH>2 ? 55:40) : 20;

export default {
  window: {
    width,
    height: Platform.OS === 'ios' ? height : height - statusHeight,
    heightOrigin: height
  },
  statusHeight: statusHeight,
  headerHeight: headerHeight,
  headerPadding: headerPadding,
  bottomHeight: 60,  
  menuHeight: 80,
  isSmallDevice: width < 375,
  font: {
    small_size: 14,
    normal_size: 16,
    medium_size: 18,
    h1_size: 30,
    h2_size: 24,
    h3_size: 20,
    h4_size: 16,
    btn_size: 20
  }
};
