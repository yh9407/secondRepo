import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {storyVote} from "../../action/story";
import {
    View,
    Text,
    Button,
} from 'react-native';
import {storyLoader} from "../../action/story";

const StoryVote = ({DetailData, vote}) => {
    const dispatch = useDispatch();
    const voteHandler = () => {
        if (vote.user) {
            dispatch(storyVote(DetailData.id, true));
        } else {
            dispatch(storyVote(DetailData.id, false));
        }
    }

    const VoteButton = () => {
        if (vote.user) {
            return (
                <>
                    <Button onPress={voteHandler} title="투표 취소하기"/>
                </>
            )
        } else {
            return (
                <Button onPress={voteHandler} title="후원을 희망합니다"/>
            )
        }
    }
    useEffect(() => {
        dispatch(storyLoader(DetailData.id))
    }, [vote.user])
    return (
        <View>
            <VoteButton/>
            <Text>
                <Text style={{fontWeight: "bold"}}>필요 득표수</Text>
                를 충족할 시, 메인 캠페인으로 등록되며 {"\n"}
                <Text style={{fontWeight: "bold"}}>실제 모금</Text>이 이루어집니다.
            </Text>
        </View>
    )
}
export default StoryVote;
