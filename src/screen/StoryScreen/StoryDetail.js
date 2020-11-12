import React, {useEffect, useRef, useState} from 'react'
import {storyCommentLoader, storyLoader} from "../../action/story";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';

import {
    View,
    Text,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Animated,
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

const FontYellow = styled.Text`
font-size: 21px;
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
const CommentStyle = styled.View`
display: flex;
width: 100%;
padding: 20px 10px 10px 20px;
`
const CommentBox = styled.View`
display: flex;
width: 80%;
height: 60px;
margin-bottom: 10px;
flex-direction: row;

`
const OrangeText = styled.Text`
color: orange;
font-size: 15px;
font-weight: bold;

`
const CommentProfile = styled.Image`
width: 40px;
height: 40px;
margin-right: 10px;
border-radius: 100px;
`
const CommentPlusBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 95%;
margin-bottom: 50px;
`
const HashTag = styled.View`
display: flex;
margin-top: 10px;
margin-left: 30px;
flex-direction: row;
width: 29%;
justify-content: space-between;

`
const TagBox = styled.View`
display: flex;
margin-bottom: 20px;
align-items: center;
justify-content: center;
height: 30px;
`
const BarStyle = styled.View`
width: 100%;
height: 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
`
const Bar = styled.View`
display: flex;
background-color: #e7e7e7;
border-radius: 10px;
width: 80%;
height: 40px;
margin-bottom: 10px;
`
const BarIn = styled.View`
align-items: center;
justify-content: center;
background-color: orange;
border-radius: 10px;
height: 40px;
${(props) => (props.ratio == 0 ? "width:0px" : `width:${props.ratio}%`)};
`
const BarTextBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 90%;
margin-top: 10px;
`
const BarText = styled.Text`
font-size: 15px;
color: gray;
`
const StoryDetail = (props) => {
    const dispatch = useDispatch();
    const DetailData = useSelector((state) => state.story.story.data)
    const vote = useSelector((state) => state.story.vote)
    const like = useSelector((state) => state.story.like)
    const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true)
    const CommentData = useSelector((state) => state.story.comment.list);
    const CommentStatus = useSelector((state) => state.comment.comment.status);

    const fadeAnim = useRef(new Animated.Value(0)).current

    const ProgressBar = () => {
        let ratio = (DetailData.story_vote / DetailData.story_goal) * 100;
        if (ratio > 100) ratio = 100;
        return (
            <>
                <BarStyle>
                    <Bar>
                        <BarIn ratio={ratio}>
                            <Animated.Text
                                style={{
                                    opacity: fadeAnim,
                                }}>
                                {ratio}%
                            </Animated.Text>
                        </BarIn>
                    </Bar>
                </BarStyle>
                <BarTextBox>
                    <BarText>
                        {DetailData.story_vote}/{DetailData.story_goal}
                    </BarText>
                </BarTextBox>
            </>
        )
    }

    useEffect(() => {
        dispatch(storyCommentLoader(DetailData.id))
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim, DetailData.id, vote.user, CommentStatus])

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
                            해시 태그
                        </MiddleFont>
                    </MarginBox>
                    <HashTag>
                        {DetailData.Hashtags.map((hashTag, key) => {
                            return (
                                <TagBox>
                                    <FontYellow key={key}>
                                        # {hashTag.hashtag}
                                    </FontYellow>
                                </TagBox>
                            )
                        })}
                    </HashTag>
                    <ProgressBar/>

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

                </StoryContentStyle>

                <MarginBox>
                    <MiddleFont>
                        댓글
                    </MiddleFont>
                </MarginBox>
                <CommentInput story_id={DetailData.id}/>
                <CommentStyle>
                    {CommentData !== [] && CommentData.map((comment, key) => {
                            return (
                                <View key={key}>
                                    <CommentBox>
                                        <CommentProfile source={{
                                            uri: comment.User.user_profile
                                        }}/>
                                        <OrangeText>{comment.User.nickname}</OrangeText>
                                        <Text>
                                            {'\u0020'} {'\u0020'} {'\u0020'} {comment.comment}
                                        </Text>
                                    </CommentBox>
                                </View>
                            )
                        }
                    )}

                </CommentStyle>
                <CommentPlusBox>
                    <TouchableOpacity onPress={() => props.navigation.navigate("CommentLoader")}>
                        <Text>
                            댓글 더보기
                        </Text>
                    </TouchableOpacity>
                </CommentPlusBox>
            </ScrollBox>
        </>
    )
}
export default StoryDetail;
