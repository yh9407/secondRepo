import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {useSelector} from "react-redux";


const HomeScreen =(props)=> {
    const signInData = useSelector((state)=>state.auth.user)
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapContent}>
                    <Text>닉네임 : {signInData.nickname}</Text>
                </View>
            </ScrollView>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: 'white',
    },
    wrapContent: {
        width: wp('90%'),
        height: wp('90%'),
        paddingBottom: wp('5%'),

    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#46c3ad",
    }
})
export default HomeScreen;
