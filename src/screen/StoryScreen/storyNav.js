import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch} from "react-redux";
import {allStoryLoader} from "../../action/story";

const StoryNavScreen = (props,setStoryType,setChanged) => {

    return (
        <View >
            <TouchableOpacity
                onPress={() =>{setStoryType("hot")
                setChanged(true)}}>
                <Text>인기스토리</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>{setStoryType("new")
                    setChanged(true)}}>
                <Text>최신스토리</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>{setStoryType("past")
                    setChanged(true)}}>
                <Text>지난스토리</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapButton: {
        width: wp('100%'),
        height: hp('8%'),
        paddingLeft: wp('8%'),
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    }
})
export default StoryNavScreen;
