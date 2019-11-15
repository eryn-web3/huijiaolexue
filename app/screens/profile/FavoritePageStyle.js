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
    paddingHorizontal: 20
  },
  headerWrap: {
    width: LW-40, 
    height: Layout.headerHeight, 
    alignItems: 'center', 
    paddingTop: Layout.headerPadding
  },
  headerTxt: {
    color: '#333', 
    fontSize: 16
  },
  headerLeftBtn: {
    position: 'absolute', 
    left: 20, 
    top: Layout.headerPadding,
    flexDirection: 'row'
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
    backgroundColor: '#f5f5f5',
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
  resourceSectionElems: {    
    width: LW,
    marginBottom: 10
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 13,
    width: LW, 
    backgroundColor: '#fff',
  },
  resourceTitleTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  resourceDesc: {
    position: 'absolute', 
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  resourceDescTxt: {
    color: '#666',
    fontSize: 15
  },
  resourceTimeTxt: {
    position: 'absolute', 
    bottom: 0,
    color: '#666',
    fontSize: 15
  },
  resourceImg: {
    width: 140, 
    height: 105,
  },
  emptyList: {
    width: LW,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyListTxt: {
    fontSize: 16,
    color: Colors.homeTextGreyColor,
    textAlign: 'center'
  },
});