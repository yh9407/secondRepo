import React, {useState} from "react";
import axios from "axios";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet, Button
} from "react-native";
import IP from "../../../Ip";
import Images from "../../../public/pictures";
import styled from 'styled-components';

const SignUpStyle = styled.View`
display: flex;
width: 100%;
align-items: center;
`
const BackgroundImg = styled.Image`
width: 100%;
height: 100%;
`
const ImageBox = styled.View`
width: 100%;
height: 300px;
`
const SignUpBox = styled.View`
padding: 10px;
margin-top: 20px;
display: flex;
width: 83%;

`
const EmailInput = styled.TextInput`
display: flex;
border-bottom-color: lightgray;
border-bottom-width: 1.5px;
font-size: 17px;
`
const PwdInput = styled.TextInput`
display: flex;
font-size: 17px;
`
const SignUpBtn = styled.TouchableOpacity`
margin-top: 10px;
width: 83%;
height: 40px;
justify-content: center;
align-items: center;
border-color: orange;
border-width: 1px;
display: flex;
`
const SignUpText = styled.Text`
font-size: 20px;
color: orange;
`
const SignInText = styled.Text`
font-size: 19px;
color: gray;
`
const SignInBtn = styled.TouchableOpacity`
margin-top: 10px;
height: 40px;
flex-direction: column-reverse;
justify-content: center;
width: 160px;
`
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
        const result = await axios.post(`${IP}/auth/signup`, {...userInfo})
        props.navigation.navigate('SignIn')
    }
    return (
        <ScrollView>
            <SignUpStyle>
                <ImageBox>
                    <BackgroundImg source={Images.signUp.hugImg}/>
                </ImageBox>
                <SignUpBox>
                    <EmailInput
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="orange"
                        autoCapitalize="none"
                        onChangeText={handleEmail}
                    />
                    <EmailInput
                        underlineColorAndroid="transparent"
                        placeholder="Nickname"
                        placeholderTextColor="orange"
                        autoCapitalize="none"
                        onChangeText={handleNickname}
                    />
                    <EmailInput
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="orange"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={handlePassword}
                    />

                </SignUpBox>
                <SignUpBtn
                    onPress={() => signUpHandler(userInfo.email, userInfo.password, userInfo.nickname)}
                >
                    <SignUpText>회원가입 하기</SignUpText>
                </SignUpBtn>
                <SignInBtn
                    onPress={() => props.navigation.navigate("SignIn")}>
                    <SignInText>이미 회원이신가요?</SignInText>
                </SignInBtn>
            </SignUpStyle>
        </ScrollView>
    )

}

export default SignUp;
