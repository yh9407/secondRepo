import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image, ScrollView,
} from 'react-native';
import {useSelector} from "react-redux";
import ListItem from "./ListItem";
import styled from 'styled-components';
import IP from "../../../Ip";

const HomeStyle = styled.ScrollView`
display: flex;
`
const HomeImage = styled.Image`
width: 100%;
height: 320px;
`

const ImageBox = styled.View`
display: flex;
margin-top: 20px;
width: 100%;
height: 300px;
`
const TitleStyle = styled.View`
display: flex;
width: 100%;
height: 70px;
margin-top: 20px;
justify-content: center;
align-items: center;
`
const TitleBox = styled.View`
width: 35%;
`
const TitleLine = styled.View`
width: 50%;
margin-top: 8px;
border-bottom-color: orange;
border-bottom-width: 1px;
`
const TitleText = styled.Text`
font-size: 20px;
`
const HugStyle = styled.View`
display: flex;
width: 100%;
height: 110px;
flex-direction: row-reverse;
`
const HugText = styled.Text`
font-size: 22px;
color: orange;
`
const HugBox = styled.View`
margin-top: 20px;
width: 30%;

`
const HomeScreen = (props) => {
    const [data, setData] = useState([])
    const signInData = useSelector((state) => state.auth.user)

    const getData = () => {
        const url = `${IP}/campaign/list/1`
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.list)
            })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
        <HomeStyle>
            <TitleStyle>
                <TitleBox>
                    <TitleText>
                        진행 중인 캠페인
                    </TitleText>
                </TitleBox>
                <TitleLine/>
            </TitleStyle>
            <ImageBox style={{height: "100%", width: "100%"}}>
                <ListItem data={data} props={props}/>
            </ImageBox>
        </HomeStyle>
            <HugStyle>
                <HugBox>
                    <HugText>
                        허그 소개
                    </HugText>
                </HugBox>
            </HugStyle>

            </>
    );
}

export default HomeScreen;
