import React, {useEffect, useRef, useState} from 'react'
import {storyCommentLoader, storyLoader} from "../../action/story";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';

import {
    View,
    Text,
    ScrollView, Dimensions,
    FlatList,
    ActivityIndicator,
} from 'react-native';


import {Card} from 'react-native-paper';
import CommentInput from "./CommentInput";
import StoryVote from "./StoryVote";
import StoryLike from "./StoryLike";
import CommentLoader from "./CommentLoader";

const ScrollBox = styled.ScrollView`
width: 100%;
height: 100%;
`
const StoryContentStyle = styled.View`
margin-top: 30px;
width: 100%;
display: flex;
flex-direction: column;
`
const StoryTitle = styled.View`
display: flex;
width: 100%;
margin-left: 50px;
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
font-size: 30px;
`
const StoryWriter = styled.View`
display: flex;
width: 90%;
margin-top: 10px;
margin-bottom: 15px;
flex-direction: row-reverse;

`
const SmallFont = styled.Text`
font-size: 15px;
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
const WriterInfo = styled.View`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
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
const GoodsBoxBox = styled.View`
display: flex;
width: 100%;
align-items: center;
height: 100px;
`
const GoodsBox = styled.View`
display: flex;
width: 85%;
height: 80px;
flex-direction: row;
padding: 10px;
background-color: antiquewhite;
`
const TagBox = styled.View`
display: flex;
margin-left: 30px;
padding: 10px;
margin-bottom: 20px;
align-items: center;
justify-content: center;
height: 30px;
width: 30%;
background-color: antiquewhite;
`
const FontYellow = styled.Text`
color: #ffa400;
`
const LikeBox = styled.View`
display: flex;
align-content: flex-end;
flex-direction: row-reverse;
width: 100%;
`
const LikeBtn = styled.View`
display:flex;
width: 78%;
flex-direction: row-reverse;
`


const StoryDetail = () => {
    const dispatch = useDispatch();
    const DetailData = useSelector((state) => state.story.story.data)
    const vote = useSelector((state) => state.story.vote)
    const like = useSelector((state) => state.story.like)
    const [enableScrollViewScroll,setEnableScrollViewScroll] =useState(true)

    return (
        <>

            <ScrollBox>
                <StoryContentStyle>
                    <StoryTitle>
                        <TextTitle>
                            {DetailData.Story_Items[0].item_name}{'\u0020'}{'\u0020'}{'\u0020'}
                        </TextTitle>
                    </StoryTitle>
                    <Line/>
                    <StoryWriter>
                        <SmallFont>
                            {DetailData.User.nickname} 님
                        </SmallFont>
                    </StoryWriter>
                    <MarginBox>
                        <MiddleFont>
                            작성자 소개
                        </MiddleFont>
                    </MarginBox>
                    <WriterInfo>
                        <InfoBox>
                            <Text>
                                {'\u0020'} {'\u0020'}{'\u0020'} {DetailData.user_info}
                            </Text>
                        </InfoBox>
                    </WriterInfo>
                    <Card>
                        <Card.Cover source={{
                            uri: DetailData.Story_Files[0].file
                        }}/>
                    </Card>
                    <MarginBox>
                        <MiddleFont>
                            내용
                        </MiddleFont>
                    </MarginBox>
                    <WriterInfo>
                        <InfoBox>
                            <Text>
                                {'\u0020'} {'\u0020'}{'\u0020'} {DetailData.story_content}
                            </Text>
                        </InfoBox>
                    </WriterInfo>
                    <MarginBox>
                        <MiddleFont>
                            저는 이런것들이 필요합니다
                        </MiddleFont>
                    </MarginBox>
                    <GoodsBoxBox>
                        <GoodsBox>
                            <Text>
                                {DetailData.Story_Items[0].item_name}(
                                물품가격 : {DetailData.Story_Items[0].item_price}원 X
                                물품갯수 : {DetailData.Story_Items[0].item_quantity}개 )
                            </Text>
                            <Text>
                                {'\n'}{'\n'}
                                합계 {DetailData.Story_Items[0].item_price * DetailData.Story_Items[0].item_quantity}원
                            </Text>

                        </GoodsBox>
                    </GoodsBoxBox>
                    <MarginBox>
                        <MiddleFont>
                            태그
                        </MiddleFont>
                    </MarginBox>

                    {DetailData.Hashtags.map((hashTag, key) => {
                        return (
                            <TagBox>
                                <FontYellow key={key}>
                                    # {hashTag.hashtag}
                                </FontYellow>
                            </TagBox>)
                    })}


                    <StoryVote DetailData={DetailData} vote={vote}/>
                    <LikeBox>
                        <Text>
                            좋아요 {DetailData.story_like}
                            {'\u0020'}{'\u0020'}{'\u0020'}
                            조회수 {DetailData.visited}{'\u0020'}{'\u0020'}{'\u0020'}
                        </Text>
                    </LikeBox>
                    <LikeBtn>
                        <StoryLike id={DetailData.id} like={like}/>
                    </LikeBtn>
                    <Text>
                        스토리 목표 : {DetailData.story_goal}
                        스토리 투표수 : {DetailData.story_vote}
                    </Text>

                </StoryContentStyle>
            </ScrollBox>
            <MarginBox>
                <MiddleFont>
                    댓글
                </MiddleFont>
            </MarginBox>
            <CommentInput story_id={DetailData.id}/>
            <CommentLoader id={DetailData.id}/>
        </>
    )
}
export default StoryDetail;
