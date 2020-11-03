import React, {useEffect, useRef, useState} from 'react'
import {storyLoader} from "../../action/story";
import {useDispatch} from "react-redux";
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {useSelector} from "react-redux";
import {Card} from 'react-native-paper';
import axios from "axios"
import {Image} from "react-native-paper/src/components/Avatar/Avatar";


const StoryDetail = ({storyId, setOnClickStory, onClickStory}) => {
    const [loading, setLoading] = useState(false)
    const [commentList, setCommentList] = useState([]);
    const DetailData = useSelector((state) => state.story.story.data)
    const DataStatus = useSelector((state) => state.story.story.status)
    const init = useRef(true);
    const Comment_id = DetailData.id

    const CommentLoadHandler = () => {
        const loadInit = async () => {
            setLoading(true);
            const initData = await axios.get(`http://121.144.131.216:3000/comment/list/${Comment_id}/1`)
            setCommentList(initData.data.list)
        }
        useEffect(() => {
            if (init.current) {
                loadInit();
                init.current = false;
            }
        }, [onClickStory])
        return null;
    }
    console.log(DataStatus)
    console.log(DetailData.Story_Items)




    return (
        <>
            <CommentLoadHandler/>
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
                    {commentList !== undefined && commentList.map((comment, key) => {
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

            <TouchableOpacity onPress={() =>
                setOnClickStory(false)
            }><Text>돌아가기</Text>

            </TouchableOpacity>

        </>
    )
}
export default StoryDetail;
