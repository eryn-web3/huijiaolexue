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
    fontSize: 16,
    fontWeight: 'bold'
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