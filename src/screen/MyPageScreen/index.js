import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {useSelector} from "react-redux";
import {Image} from "react-native-paper/src/components/Avatar/Avatar";


const MyPageScreen =({navigation})=> {
    const signInData = useSelector((state)=>state.auth.user)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.wrapContent}>
                <View>
                <Image source={{
                    uri:signInData.profile
                }}/>
            </View>
                <Text>이메일 : {signInData.email}</Text>
            </View>
            <View>
                <Text>
                    <Text>닉네임 : {signInData.nickname}</Text>
                </Text>
            </View>
            <View>
                <Text>
                    <Text>휴대전화 : {signInData.phone_number}</Text>
                </Text>
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
export default MyPageScreen;
