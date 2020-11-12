import React, {useEffect, useState} from "react"
import {
    View,
    Button,
    Text,
    ScrollView
} from 'react-native';
import {useSelector} from "react-redux";
import styled from 'styled-components';
import IP from "../../../Ip";

const TalkContentStyle = styled.View`
margin-top: 30px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`
const TalkTitle = styled.View`
display: flex;
width: 100%;
margin-left: 40px;
margin-bottom: 15px;
flex-direction: column;
`
const Line = styled.View`
display: flex;
width: 100%;
border-bottom-color: orange;
border-bottom-width: 2px;
`
const TextTitle = styled.Text`
font-size: 25px;
`
const StoryWriter = styled.View`
display: flex;
width: 95%;
margin-top: 10px;
margin-bottom: 15px;
flex-direction: row-reverse;
`
const SmallFont = styled.Text`
font-size: 15px;
`
const TalkImages = styled.Image`
width: 100%;
height: 300px;
margin-bottom: 10px;
`
const ImageBox = styled.View`
display: flex;
width: 100%;
height: 300px;
`
const InfoBox = styled.View`
display: flex;
width: 85%;
height: 40px;
flex-direction: row;
align-items: center;
justify-content: flex-start;
border-style: solid;
border-color: lightgray;
border-width: 1px;
margin-bottom: 30px;
`
const TalkDetail = () => {
    const DetailData = useSelector((state) => state.talk.talk.data)
    const [list, setList] = useState([])
    // console.log(list)
    const getData = async () => {
        const url = `${IP}/talk/${DetailData.id}`
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                for (let i = 0; i < responseJson.data.Talk_Files.length; i++) {
                    setList(list.concat(responseJson.data.Talk_Files[i].file))
                }
                console.log(list)
            })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <ScrollView>
            <TalkContentStyle>
                <TalkTitle>
                    <TextTitle>
                        {DetailData.talk_title}
                    </TextTitle>
                </TalkTitle>
                <Line/>
                <StoryWriter>
                    <SmallFont>
                        작성자 {DetailData.User.nickname}
                    </SmallFont>
                </StoryWriter>
                <InfoBox>
                    <Text>
                        {DetailData.talk_content}
                    </Text>
                </InfoBox>
                <Text>
                    조회수 : {DetailData.visited}
                </Text>
            </TalkContentStyle>
        </ScrollView>
    )
}
export default TalkDetail;
