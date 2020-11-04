import React, {useEffect, useRef, useState} from 'react'
import {storyCommentLoader, storyLoader} from "../../action/story";
import {useDispatch} from "react-redux";
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import {useSelector} from "react-redux";
import {Card} from 'react-native-paper';
import {Image} from "react-native-paper/src/components/Avatar/Avatar";
import CommentInput from "./CommentInput";



const StoryDetail = () => {
    const dispatch = useDispatch();
    const DetailData = useSelector((state) => state.story.story.data)
    const CommentData = useSelector((state)=> state.story.comment.list);
    const CommentStatus = useSelector((state)=> state.comment.comment.status);

    useEffect(() => {
        dispatch(storyCommentLoader(DetailData.id))
    }, [DetailData.id,CommentStatus])
    console.log(CommentStatus)
    return (
        <ScrollView>
            <View>
                <Text>
                    제목 = {DetailData.Story_Items[0].item_name}
                    작성자 = {DetailData.User.nickname}
                </Text>
                <Text>
                    작성자 소개 = {DetailData.user_info}
                </Text>
                <Card>
                    <Card.Cover source={{
                        uri: DetailData.Story_Files[0].file
                    }}/>
                </Card>
                <Text>
                    내용 : {DetailData.story_content}
                </Text>
                <Text>
                    저는 이런것들이 필요합니다
                </Text>
                <Text>

                    물품이름 : {DetailData.Story_Items[0].item_name}
                    물품가격 : {DetailData.Story_Items[0].item_price}
                    물품갯수 : {DetailData.Story_Items[0].item_quantity}
                </Text>
                <Text>
                    스토리 목표 : {DetailData.story_goal}
                    스토리 투표수 : {DetailData.story_vote}
                </Text>
                <Text>
                    좋아요 : {DetailData.story_like}
                    조회수 : {DetailData.visited}
                </Text>
                <View>
                    {CommentData !== [] && CommentData.map((comment, key) => {
                        return <View key={key}>
                            <Text>{comment.User.nickname}</Text>
                            <Image source={{
                                uri: comment.User.user_profile
                            }}/>
                            <Text>
                                댓글 내용 : {comment.comment}
                            </Text>
                        </View>
                    })}
                </View>
            </View>
            <CommentInput story_id={DetailData.id}/>
        </ScrollView>
    )
}
export default StoryDetail;
