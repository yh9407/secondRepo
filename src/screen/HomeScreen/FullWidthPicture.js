import React, {useEffect, useState} from "react"
import {
    View,
    ScrollView,
    ImageBackground,
    Image,
    Button,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity, Dimensions,
} from 'react-native';

const FullWidthPicture = ({uri}) => {
    const [ratio, setRatio] = useState(1);


    useEffect(() => {
        if (uri) {
            Image.getSize(uri, (width, height) => {
                setRatio(width / height);
            });
        }
    }, [uri])
    return (
        <Image
            style={{width: '100%', height: undefined, aspectRatio: ratio}}
            resizeMode="contain"
            source={{uri}}
        />
    )
}
export default FullWidthPicture;
