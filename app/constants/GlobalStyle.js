import { Platform } from 'react-native';

// constant
import Colors from './Colors';
import Layout from './Layout';

const LW = Layout.window.width;
const LH = Layout.window.height;
const CW = LW;
const CH = Platform.OS === 'ios' ? LH-(Layout.statusHeight+Layout.headerHeight) : LH-(Layout.headerHeight)

export default {  
    loading: {
      position: 'absolute', 
      left: 0, 
      top: 0, 
      width: LW,
      height: LH,
    },
    container: {
      width: LW,
      height: LH, 
      backgroundColor: Colors.mainBkColor,
      marginTop: 0
    },  
    pageWrap: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: LW,
      height: LH,    
      flexDirection: 'column',
      backgroundColor: Colors.homeBgGreyColor2,
      paddingTop: Platform.OS === 'ios' ? Layout.statusHeight + Layout.headerHeight : Layout.headerHeight
    },
    hideDrawMenuBtn: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: LW,
      height: LH
    },    
    modalWrapStyle: {
      flex: 1,
      width: LW,
      backgroundColor: 'rgba(0,0,0,0.9)'
    },
    modalStyle: {
      marginTop: 0,
      width: LW,
      height: LH,
    },
    modalClose: {
      position: 'absolute',
      top: 10,
      left: 10,
      width: 30,
      height: 30,
      backgroundColor: Colors.modalCloseColor,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
      paddingTop: 5,
      paddingLeft: 7,
      zIndex: 1000
    },
    modalTitle: {
      position: 'absolute',
      top: 15,
      left: 0,
      width: LW,
      alignItems: 'center',
      zIndex: 1
    },
    modalTitleTxt: {
      textAlign: 'center',
      color: Colors.whiteColor,
      fontSize: Layout.font.medium_size
    }
  }