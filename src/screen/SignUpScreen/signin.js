import React, {useEffect, useState} from 'react'
import {
    ScrollView,
} from "react-native";
import {useDispatch} from "react-redux";
import {signInRequest} from "../../action/auth";
import {useSelector} from "react-redux";
import styled from 'styled-components';
import Images from "../../../public/pictures";

const SignInStyle = styled.View`
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
height: 320px;
`
const LoginBox = styled.View`
padding: 10px;
margin-top: 20px;
display: flex;
width: 83%;

`
const EmailInput = styled.TextInput`
display: flex;
border-bottom-color: lightgray;
border-bottom-width: 1px;
font-size: 17px;
`
const PwdInput = styled.TextInput`
display: flex;
font-size: 17px;
`
const LoginBtn = styled.TouchableOpacity`
margin-top: 10px;
width: 83%;
height: 40px;
justify-content: center;
align-items: center;
border-color: orange;
border-width: 1px;
display: flex;
`
const LoginText = styled.Text`
font-size: 24px;
color: orange;
`
const SignUpText = styled.Text`
font-size: 18px;
color: gray;
`
const SignUpBtn = styled.TouchableOpacity`
margin-top: 10px;
height: 40px;
flex-direction: column-reverse;
justify-content: center;
width: 160px;
`


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
        <ScrollView>
        <SignInStyle>
            <ImageBox>
            <BackgroundImg source={Images.home.hugus}/>
            </ImageBox>
            <LoginBox>
            <EmailInput
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="orange"
                autoCapitalize="none"
                onChangeText={handleEmail}
            />
            <EmailInput
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="orange"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={handlePassword}
            />
            </LoginBox>
            <LoginBtn
                onPress={() => signInHandler(userInfo.email, userInfo.password)}
            >
                <LoginText>로그인</LoginText>

            </LoginBtn>

            <SignUpBtn
                onPress={()=>props.navigation.navigate("SignUp")}>
                <SignUpText>회원이 아니신가요 ? </SignUpText>
            </SignUpBtn>
        </SignInStyle>
        </ScrollView>
    )
}

export default SignIn;
