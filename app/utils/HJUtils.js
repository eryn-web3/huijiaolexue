import {
  AsyncStorage,
  Alert
} from 'react-native';
import config from '../constants/config';

const LOG_LEVEL = 12  // 5: error, 4: important, 3: start-end, 2: medium, 1: low


/**
 * @class Utils
 * @description util class
 */
class HJ_Utils {

  /**
   * @method constructor
   * @description This is constructor function
   */
  constructor() {
    
  }


  /**
   * @method copyObject
   * @description this function is to copy each key and value to new object.
   * @param obj 
   */
  copyObject( newObj, oldObj ) {
    for (var prop in oldObj) {
      if (oldObj.hasOwnProperty(prop)) {
        newObj[prop] = oldObj[prop];
      }
    }
  }


  /**
   * @method littleToBigEndian
   * @description this function is to convert little-endian hex string to big-endian.
   * @param leHexStr 
   */
  littleToBigEndian( leHexStr ) {
    var beHexStr = ''
    for( var i=0; i<leHexStr.length; i=i+2){
      var str = leHexStr.slice(i,i+2);
      beHexStr = str + beHexStr
    }
    return beHexStr;
  }


  /**
   * @method textEllipsis
   * @description This function is to get coin from symbol string.
   * @param text 
   * @param length
   * @return ellipsis
   */
  textEllipsis (text, length) {
    var ret = text;
    if( text.length > length ){
      ret = text.slice(0,length) + '...';
    }

    return ret;
  }


  /**
   * @method textEllipsis
   * @description This function is to get coin from symbol string.
   * @param text 
   * @param length
   * @return ellipsis
   */
  floatLimitText (fVal, length) {
    var ret = '' + fVal;
    if( ret.length > length ){
      ret = ret.slice(0,length);
    }

    return ret;
  }


  /**
   * @method getFormattedDate
   * @description to get formatted date string.
   * @param - date: javascript date object
   * @returns formatted date string
   *          (ex: '21-05-2019')
   */
  getFormattedDate(timestamp) {
    var date = new Date(timestamp);
    var month = date.getMonth() + 1;
    if( month<10 ) month = '0' + month
    var day = date .getDate();
    if( day<10 ) day = '0' + day
    var year = date .getFullYear();

    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var mins = date.getMinutes()+1 < 10 ? '0' + date.getMinutes() : date.getMinutes();
    
    return month + "/" + day + '/' + year + ' ' + hours + ':' + mins;
  }


  /**
   * @method checkValid
   * @description check value is valid or not.
   */
  checkValid( val ){
    try{
      if( val != undefined && val != null && val != '' && val != false && val != 'null' ) return true;
      return false;
    } catch(e) {
      return false;
    }    
  }


  /**
   * @method defaultStorage
   * @description return default storage object.
   */
  defaultStorage() {
    return {
      user: {
        userId: null,
        userName: '',
        expire: null
      },      
      downloads: []
    }
  }


  /**
   * @method getStorage
   * @description return storage object.
   */
  async getStorage() {
    var storage = await AsyncStorage.getItem('@huijiaolexue');
    storage = JSON.parse(storage);
    if( !this.checkValid( storage ) ){
      return null
    }
    return storage;
  }


  /**
   * @method setStorage
   * @description set storage.
   */
  async setStorage(storage) {
    await AsyncStorage.setItem('@huijiaolexue', JSON.stringify( storage ));
  }


  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  log(){
    var level = arguments[0]
    if( level < LOG_LEVEL ) return;

    var args = [];
    for( var i=1; i<arguments.length; i++ ){
      args.push( arguments[i] );
    }
    console.log( args );
  }


  alert( title, desc, okTxt="OK", okCallback=()=>{} ){    
    
    Alert.alert(
      title, desc,
      [{text: okTxt, onPress: okCallback}],
      { cancelable: false }
    )
  }


  getMediaType( url ){
    var ext = url.split('.').pop();
    var images = ['png', 'jpg', 'jpeg', 'bmp', 'tiff', 'gif'];
    var videos = ['mp4', 'mpeg', 'mov', 'avi'];
    if( images.includes( ext ) ) return 'photo';
    else if( videos.includes( ext ) ) return 'video';

    return '';
  }


  strCapitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }


  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };


  getPresentEmail(email){
    if(email && email !== ''){
      const textData = email.toLowerCase();
      var splits = textData.split('@')
      if(splits.length === 2){

        var suffix   =  splits[splits.length-1]
        var prefix   =  textData.slice(0,1)
  
        var reapeat =  splits[0].length - 1 
        for(i=0;i<reapeat;i++){
          prefix  += '*';
        }
        var present_email  =  prefix + "@" + suffix

        return present_email
      }  
    }
    return ""
  }


  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }


  getFiletypeFromURL(str) {
    if (str == '' || str == null || str == undefined) return '';
    str = str.split('.');
    return str[str.length - 1].toLowerCase();
  }
}

export default new HJ_Utils()
