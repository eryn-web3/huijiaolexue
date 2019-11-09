import { StyleSheet} from 'react-native'
// constant
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LW = Layout.window.width;
const LH = Layout.window.height;
const LHOrigin = Layout.window.heightOrigin;
const RateWH = LH/LW;



export default StyleSheet.create({
  loading: {
    position: 'absolute', 
    left: 0, 
    top: 0, 
    width: LH,
    height: LW,
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
    width: Platform.OS === 'ios' ? LHOrigin : LHOrigin+10, 
    height: 40, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    paddingHorizontal: 20
  },
  headerWrap: {
    width: LHOrigin-40, 
    height: 40, 
    alignItems: 'flex-start', 
    paddingTop: 10,
    paddingLeft: 30
  },
  headerTxt: {
    color: '#fff', 
    fontSize: 16
  },
  headerLeftBtn: {
    position: 'absolute', 
    left: 20, 
    top: 10,
    flexDirection: 'row'
  },
  headerRightBtn: {
    position: 'absolute', 
    right: RateWH>2 ? 40:20, 
    top: 10,
    flexDirection: 'row'
  },
  headerRightBtnTxt: {
    color: '#333',
    fontSize: 14
  },
  mainContent: {
    flexDirection: 'column',
    width: Platform.OS === 'ios' ? LHOrigin : LHOrigin+10, 
    height: LW,
    
    backgroundColor: '#f5f5f5'
  },
  carouselWrap: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  shareWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: LH,
    height: LW,
    backgroundColor: '#rgba(0,0,0,0)',
  },
  shareQRWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: LHOrigin,
    height: LW,
    backgroundColor: '#rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
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
    paddingHorizontal: 15,
    paddingTop: 0,
    paddingBottom: 15,
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
    backgroundColor: '#fff',
    borderTopRightRadius: 8, 
    borderTopLeftRadius: 8,
    paddingBottom: 10
  },
  resourceTitleTxt: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
  },
  resourceDesc: {
    marginTop: 5,
    paddingHorizontal: 10,
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
    marginBottom: 5,
  }
});