import React, {useState} from "react";
import axios from "axios";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet, Button
} from "react-native";

const SignUp = (props) => {

    const [userInfo, setUserInfo] = useState({
        email: "",
        nickname: "",
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
    const handleNickname = (text) => {
        setUserInfo({
            ...userInfo,
            nickname: text
        })
    };

    const signUpHandler = async () => {
        const result = await axios.post("http://localhost:3000/auth/signup",{...userInfo})
        props.navigation.replace('SignInScreen')
    }
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
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Nickname"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handleNickname}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => signUpHandler(userInfo.email, userInfo.password, userInfo.nickname)}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>props.navigation.replace("SignInScreen")}>
                <Text>이미 회원이신가요?</Text>
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
export default SignUp;
