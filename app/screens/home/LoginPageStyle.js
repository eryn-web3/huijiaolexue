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
    top: Layout.headerPadding, 
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
  carouselWrap: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  subjectBtnWrap: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subjectBtn: {
    alignItems: 'center'
  },
  subjectBtnTxt: {
    marginTop: 8,
    color: '#666',
    fontSize: 15
  },
  resourceSection: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between',

  },
  resourceSectionTitle: {
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold'
  },
  resourceSectionElems: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  moreBtn: {
    position: 'absolute',
    top: 5,
    right: 20
  },
  moreBtnTxt: {
    color: '#666',
    fontSize: 12
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