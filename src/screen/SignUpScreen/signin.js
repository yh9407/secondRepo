import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from "react-native";
import {useDispatch} from "react-redux";
import {signInRequest} from "../../action/auth";
import {useSelector} from "react-redux";


const SignIn = (props) => {
    const dispatch = useDispatch();
    const signInData = useSelector((state)=>state.auth.user)
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })
    const handleEmail = (text) => {
        setUserInfo({
            ...userInfo,
            email: text
        })
    };
    const handlePassword = (text) => {
        setUserInfo({
            ...userInfo,
            password: text
        })
    };
    const signInHandler = async () => {
        await dispatch(signInRequest(userInfo))
        if(signInData.isLoggedIn){
            props.navigation.navigate("Home")
        }
    }
    useEffect(()=>{

    },[signInData])
    return (
        <View>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handleEmail}
            />
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={handlePassword}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => signInHandler(userInfo.email, userInfo.password)}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>props.navigation.navigate("SignUp")}>
                <Text>회원가입하러가기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>props.navigation.navigate("Home")}>
                <Text>Home으로</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "#7a42f4",
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: "#7a42f4",
        padding: 10,
        margin: 15,
        height: 40
    },
    submitButtonText: {
        color: "white"
    }
});
export default SignIn;
