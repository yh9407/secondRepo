import React, {useState} from 'react';
import axios from "axios"
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {signOutRequest} from "../../action/auth";

const SettingScreen = (props) => {
    const dispatch = useDispatch();

    const logOut = async () => {
        await dispatch(signOutRequest())
        props.navigation.navigate("Home")
    }
    const alertHandler = () =>{
        Alert.alert(
            "Alert",
            "Are you sure?",
            [
                {text: 'ok', onPress:(logOut)},
                {text: 'cancel', onPress: ()=> null},
            ],
            {cancelable:false}
        )
    }

    return (

        <View style={styles.container}>

            <TouchableOpacity
                style={styles.wrapButton}
            >
                <Text>🏅 Something</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.wrapButton}
                onPress={alertHandler}
            >
                <Text>🔓 Logout</Text>
            </TouchableOpacity>

        </View>
    );
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
export default SettingScreen;
