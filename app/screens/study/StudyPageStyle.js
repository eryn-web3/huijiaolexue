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
    height: Layout.headerHeight + 30, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  headerWrap: {
    width: LW, 
    height: Layout.headerHeight + 30, 
    justifyContent: 'flex-start', 
    paddingTop: Platform.OS==="ios" ? Layout.headerHeight - 40 : Layout.headerHeight - 45,
  },
  headerTxt: {
    color: '#333', 
    fontSize: 22
  },
  headerRightBtn: {
    position: 'absolute', 
    right: 20, 
    top: Layout.headerHeight - 40
  },
  headerRightBtnTxt: {
    color: '#333',
    fontSize: 14
  },
  mainContent: {
    flexDirection: 'column',
    width: LW,
    height: LH-(Layout.headerHeight+30)-Layout.bottomHeight,
    marginTop: Layout.headerHeight+30,
    backgroundColor: '#f5f5f5'
  },
  
  subjectBtnWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: Layout.headerHeight,
    width: LW,
    height: LH,
  },
  subjectBtn: {
    alignItems: 'center',
    width: 120,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  subjectBtnTxt: {
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
  },
  termSec: {
    marginTop: 10,
    marginLeft: -20,
    width: LW-30,
  },
  termScroll: {
    paddingVertical: 2,
    flexDirection: 'row',
  },
  termElem: {    
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomColor: '#00cdaf'
  },
  termElemText: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 5
  },
  whiteGradient: { 
    position: 'absolute',
    top: 0,
    right: 0
  },
  contentTypeMenuBtn: {
    position: 'absolute',
    right: 30, 
    bottom: Platform.OS==='ios' ? 7:14
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
  },
  courseTypeMenuWrap: {
    position: 'absolute',
    right: 0, 
    top: 0,
    height: LH-Layout.headerHeight-60,
    backgroundColor: '#fff'
  },
  courseTypeMenuElem: {
    width: LW/2,
    paddingVertical: 10,
    paddingLeft: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  courseTypeMenuElemTxt: {
    fontSize: 14,
    color: '#333'
  },
  resourceSectionBtn: {
    marginHorizontal: 5,
    marginVertical: 10,
    width: (LW-30-20)/2, 
  },
  resourceSectionBtnTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00cdaf',
    textAlign: 'center'
  },
});