import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {storyVote} from "../../action/story";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
} from 'react-native';
import {storyLoader} from "../../action/story";
import styled from 'styled-components';

const VoteSection= styled.View`
width: 100%;
display: flex;
align-items: center;

`
const VoteBtn = styled.TouchableHighlight`
width: 45%;
height: 45px;
margin-bottom: 30px;
justify-content: center;
align-items: center;
border-radius: 3px;
background-color: transparent;
border: solid 2.5px dodgerblue;
`
const UnVoteBtn=styled.TouchableHighlight`
width: 45%;
height: 45px;
margin-bottom: 30px;
justify-content: center;
align-items: center;
border-radius: 3px;
background-color: transparent;
border: solid 2.5px #ff4949;
`
const VoteTextFont= styled.Text`
font-size: 20px;
color: dodgerblue;
`
const UnVoteTextFont=styled.Text`
font-size: 20px;
color: #ff4949;
`
const InfoBox = styled.View`
display: flex;
width: 100%;
align-items: center;
margin-bottom: 45px;

`
const TextInfo = styled.Text`
font-size: 14px;
color: gray;
`
const ImText = styled.Text`
font-size: 18px;
color: black;
`

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
                <VoteSection>
                    <UnVoteBtn onPress={voteHandler}
                             activeOpacity={0.6}
                             underlayColor="#fc8d7e">
                        <UnVoteTextFont>
                            투표 취소하기
                        </UnVoteTextFont>
                    </UnVoteBtn>
                </VoteSection>
            )
        } else {
            return (
                <VoteSection>
                    <VoteBtn onPress={voteHandler}
                             activeOpacity={0.6}
                             underlayColor="#86c6f0">
                        <VoteTextFont>
                            후원을 희망합니다
                        </VoteTextFont>
                    </VoteBtn>
                </VoteSection>
            )
        }
    }
    useEffect(() => {
        dispatch(storyLoader(DetailData.id))
    }, [vote.user])
    return (
        <View>
            <VoteButton/>
            <InfoBox>
            <TextInfo>
                <ImText>필요 득표수</ImText>
                를 충족할 시, 메인 캠페인으로 등록되며 {"\n"} </TextInfo>
                <TextInfo>   <ImText>실제 모금</ImText>이 이루어집니다.</TextInfo>

            </InfoBox>
        </View>
    )
}
export default StoryVote;
