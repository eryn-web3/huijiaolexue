import React from 'react';
import { ActivityIndicator, Image, TouchableHighlight, TouchableOpacity } from 'react-native'


export default function Back({ navigation } = {}){
    const onPress = () => navigation.goBack();

    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={require('../../assets/images/icon/left-arrow.png')} style={{width:24, height:24}}
            />
        </TouchableOpacity>
    );    
}
