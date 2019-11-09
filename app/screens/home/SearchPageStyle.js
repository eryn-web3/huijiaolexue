import { StyleSheet, Platform} from 'react-native'
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
    paddingHorizontal: 20
  },
  headerWrap: {
    width: LW, 
    height: Layout.headerHeight, 
    justifyContent: 'flex-start', 
    paddingTop: Layout.headerPadding,
  },
  headerTxt: {
    color: '#333', 
    fontSize: 22,
    fontWeight: 'bold'
  },
  headerRightBtn: {
    position: 'absolute', 
    right: 20, 
    top: Layout.headerPadding+10,
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
    backgroundColor: '#f00'
  },

  
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: Colors.borderGreyColor,
    borderRadius: 20,
    width: LW-40-40,
  },
  searchInputTxt: {
    marginLeft: 30,
    width: LW-100,
    paddingVertical: Platform.OS==='ios' ? 8:3,
    fontSize: 14,
    lineHeight: 16,
  },
  resourceSection: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',

  },
  resourceSectionTitle: {
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold'
  },
  resourceSectionElems: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  resourceBtn: {
    marginHorizontal: 5,
    marginVertical: 10,
    width: (LW-30-20)/2, 
  },
  resourceTitleTxt: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  resourceDesc: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  resourceDescTxt: {
    color: '#666',
    fontSize: 14
  },
  resourceImg: {
    width: (LW-30-20)/2, 
    height: (LW-30-20)/2*0.75,
    borderRadius: 8,
    marginVertical: 5
  }
});