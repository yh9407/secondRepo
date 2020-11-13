import React from "react"
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {Card} from "react-native-paper";

const ActContentStyle = styled.View`
width: 100%;
display: flex;
`
const ActTitle = styled.View`
display: flex;
width: 100%;
margin-left: 10px;
margin-bottom: 15px;
flex-direction: column;
`
const TextTitle = styled.Text`
font-size: 20px;
`
const ActContents = styled.View`
display: flex;
padding: 5px;
`
const ContentText = styled.Text`
font-size: 16px;
`
const BuyInfo = styled.View`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
`
const VisitBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 90%;
margin-bottom: 10px;
`
const DateBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 90%;
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
const Line = styled.View`
display: flex;
width: 100%;
border-bottom-color: orange;
border-bottom-width: 1px;
`
const MiddleFont = styled.Text`
font-size: 18px;
font-weight: bold;
`
const MarginBox = styled.View`
margin-left: 20px;
margin-bottom: 10px;
margin-top: 10px;
`
const ActImage = styled.Image`
width: 100%;
height: 280px;
margin-bottom: 20px;
`

const ActDetail = () => {
    const DetailData = useSelector((state) => state.act.act.data)
    console.log(DetailData)
    return (
        <ScrollView>
        <ActContentStyle>
            {/*<ActTitle>*/}
            {/*    <TextTitle>*/}
            {/*        {DetailData.act_title}의 소식입니다.*/}
            {/*    </TextTitle>*/}
            {/*</ActTitle>*/}
            {/*<Line/>*/}
                <ActImage source={{
                    uri: DetailData.Act_Files[0].file
                }}/>
            <VisitBox>
                <Text>
                    조회수 {DetailData.visited}
                </Text>
            </VisitBox>
            <DateBox>
            <Text>
                {DetailData.createdAt}
            </Text>
            </DateBox>
            <MarginBox>
                <MiddleFont>
                    구매 내역
                </MiddleFont>
            </MarginBox>
            <BuyInfo>
                <InfoBox>
                    <Text>
                        {'\u0020'} {'\u0020'}{'\u0020'} {DetailData.act_buy}
                    </Text>
                </InfoBox>
            </BuyInfo>

            <ActContents>
                <ContentText>
                    {DetailData.act_content}
                </ContentText>
            </ActContents>
        </ActContentStyle>
        </ScrollView>
    )
}
export default ActDetail;
