import React, {useEffect, useState} from "react"
import {
    View,
    Button,
    Text,
    ScrollView, TouchableOpacity
} from 'react-native';
import {useSelector} from "react-redux";
import styled from 'styled-components';
import IP from "../../../Ip";
import {SliderBox} from "react-native-image-slider-box"
import TalkCommentInput from "./TalkCommentInput";
import TalkLike from "./TalkLike";

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
width: 90%;
margin-top: 30px;
margin-bottom: 30px;
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
const InfoText = styled.Text`
margin-left: 10px;
`
const VisitBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 85%;
`
const VisitText = styled.Text`
margin-left: 10px;
`
const MiddleFont = styled.Text`
font-size: 18px;
font-weight: bold;
`
const MarginBox = styled.View`
width: 90%;
margin-left: 20px;
margin-bottom: 20px;
margin-top: 10px;
`
const InputBox = styled.View`
width: 100%;
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
const CommentText = styled.Text`
margin-left: 20px;
`
const LikeBox = styled.View`
display: flex;
width: 88%;
flex-direction: row-reverse;
`
const CommentPlusBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 92%;
margin-bottom: 50px;
`
const TalkDetail = (props) => {
    const DetailData = useSelector((state) => state.talk.talk.data)
    const comment_status = useSelector((state) => state.talk.comment.status)
    const like = useSelector((state) => state.talk.like)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1);
    const [initData, setInitData] =useState([]);
    const [totalComment, setTotalComment] = useState(0);
    const getData =  () => {
        const url = `${IP}/talk/${DetailData.id}`
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let newList = [];
                for (const file of responseJson.data.Talk_Files) {
                    newList.push(file.file)
                }
                setList(newList)
            })
    }
    const getCommentData = () => {
        const url = `${IP}/talk_comment/list/${DetailData.id}/${page}`
        fetch(url)
            .then((response)=> response.json())
            .then((responseJson)=> {
                setTotalComment(responseJson.total)
                setInitData(responseJson.list)
            })
    }
    useEffect(() => {
        getData()
        getCommentData()
    }, [comment_status,like.status])

    return (
        <ScrollView>
            <ImageBox>
                <SliderBox
                    dotColor="orange"
                    sliderBoxHeight={300}
                    autoplay={true}
                    circleLoop={true}
                    images={list}
                />
            </ImageBox>
            <TalkContentStyle>
                {/*<TalkTitle>*/}
                {/*    <TextTitle>*/}
                {/*        {DetailData.talk_title}*/}
                {/*    </TextTitle>*/}
                {/*</TalkTitle>*/}
                {/*<Line/>*/}
                <StoryWriter>
                    <SmallFont>
                        작성자 {DetailData.User.nickname}
                    </SmallFont>
                </StoryWriter>
                <MarginBox>
                    <MiddleFont>
                        수혜자의 소식
                    </MiddleFont>
                </MarginBox>
                <InfoBox>
                    <InfoText>
                        {DetailData.talk_content}
                    </InfoText>
                </InfoBox>
                <VisitBox>
                    <VisitText>
                        좋아요 {DetailData.talk_like}
                    </VisitText>
                    <VisitText>
                        조회수 {DetailData.visited}
                    </VisitText>
                </VisitBox>
                <LikeBox>
                <TalkLike id={DetailData.id} like={like}/>
                </LikeBox>
                <MarginBox>
                    <MiddleFont>
                        댓글 {totalComment}개
                    </MiddleFont>
                </MarginBox>
                <InputBox>
                    <TalkCommentInput talk_id={DetailData.id}/>
                </InputBox>
                <CommentStyle>
                    {initData !==[] && initData.map((comment,index)=> {
                        return (
                            <View key={index}>
                                <CommentBox>
                                    <CommentProfile source={{
                                        uri: comment.User.user_profile
                                    }}/>
                                    <OrangeText>
                                        {comment.User.nickname}
                                    </OrangeText>
                                    <CommentText>
                                        {comment.comment}
                                    </CommentText>
                                </CommentBox>
                            </View>
                        )
                    })}
                </CommentStyle>
            </TalkContentStyle>
            <CommentPlusBox>
                {totalComment <= 10 ? null :
                    <TouchableOpacity onPress={() => props.navigation.navigate("TalkCommentLoader")}>
                        <Text>
                            댓글 더보기
                        </Text>
                    </TouchableOpacity>
                }
            </CommentPlusBox>
        </ScrollView>
    )
}
export default TalkDetail;
