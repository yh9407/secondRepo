import React, {useState} from 'react';
import axios from "axios"
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useSelector} from "react-redux";
import {StackActions, NavigationActions} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SettingScreen = (props) => {
    const signInData = useSelector((state)=>state.auth.user)
    const SignOutHandler = async ()=>{
        if(signInData.isLoggedIn){
            const result = await axios.post("http://http://192.168.0.59:3000/auth/signOut",{...user.email})
            console.log(result)
        }
    }
const [user,setUser] = useState({
    email:signInData.email,
    nickname:signInData.nickname,
})
    const logOut = () => {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({routeName: "SignIn"})]
        })
        props.navigation.dispatch(resetAction);
    }
    const alertHandler = () =>{
        Alert.alert(
            "Alert",
            "Are you sure?",
            [
                {text: 'ok', onPress: logOut},
                {text: 'cancel', onPress: ()=> null},
            ],
            {cancelable:false}
        )
    }

    return (

        <View style={styles.container}>

            <TouchableOpacity
                onPress={props.navigation.navigate("FlatListPractice")}
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
