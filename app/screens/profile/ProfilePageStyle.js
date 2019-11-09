import { StyleSheet} from 'react-native'
// constant
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH/LW;



export default StyleSheet.create({
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
    alignItems: 'center', 
    flex: 1, 
    width: LW,
    height: LH
  },  
  header: {
    position: 'absolute', 
    left: 0, 
    top: 0,
    width: LW, 
    height: Layout.headerHeight, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  headerWrap: {
    width: LW, 
    height: Layout.headerHeight, 
    justifyContent: 'flex-start', 
    paddingTop: Layout.headerPadding
  },
  headerTxt: {
    color: '#333', 
    fontSize: 22,
    fontWeight: 'bold'
  },
  headerRightBtn: {
    position: 'absolute', 
    right: 20, 
    top: Layout.headerPadding
  },
  headerRightBtnTxt: {
    color: '#333',
    fontSize: 14
  },
  mainContent: {
    flexDirection: 'column',
    width: LW,
    height: LH-Layout.headerHeight,
    marginTop: Layout.headerHeight,
    backgroundColor: '#f5f5f5'
  },
});