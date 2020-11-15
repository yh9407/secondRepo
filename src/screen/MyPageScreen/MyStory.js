import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux";
import styled from 'styled-components';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import axios from "axios";
import IP from "../../../Ip";
import {storyLoader} from "../../action/story";
import {myPageRequest} from "../../action/auth";

const StoryImage = styled.Image`
width: 150px;
height: 150px;


`
const ImageBox = styled.TouchableOpacity`
width: 100%;
flex-direction: row;
margin-left: 20px;

`
const Box = styled.View`
display: flex;
width: 100%;
flex-direction: column;
justify-content: space-between;

`
const TitleText = styled.Text`
font-size: 15px;
color: black;
margin-top: 20px;
margin-left: 10px;
margin-bottom: 5px;
`
const EaBox = styled.View`
display: flex;
width: 100%;
`
const EaText = styled.Text`
font-size: 20px;
margin-left: 15px;
margin-top: 25px;
`
const TextBox = styled.View`
margin-left: 10px;
`
const Line = styled.View`
margin-top: 20px;
border-bottom-color: orange;
border-bottom-width: 1.5px;
`

const MyStory = (props) => {
    const dispatch = useDispatch();
    const myPageData = useSelector((state) => state.auth.myPage.list)
    const status = useSelector((state) => state.story.story.status)
    const signInData = useSelector((state) => state.auth.user)

    const visitHandler = async (story_id) => {
        await axios.put(`${IP}/story/visit`, {story_id: story_id})
    }
    const MyPageLoader = () => {
        dispatch(myPageRequest({type:"mobile",...signInData}))
    }
    useEffect(()=>{
        MyPageLoader()
    },[status])
    return (
        <Box>
            {myPageData && myPageData.storyList.map((item, key) => {
                return (
                    <View>
                        <TitleText>
                            {item.story_title}
                        </TitleText>
                        <EaBox>
                            <ImageBox  onPress={async () => {
                                await dispatch(storyLoader(item.id))
                                    props.navigation.navigate("StoryDetail")
                                await visitHandler(item.id)
                            }}>
                                <StoryImage source={{
                                    uri: item.Story_Files[0].file
                                }}/>
                                <TextBox>
                                    <EaText>
                                        조회수 {item.visited}
                                    </EaText>
                                    <EaText>
                                        후원 현황 {item.story_vote} / {item.story_goal}
                                    </EaText>
                                </TextBox>
                            </ImageBox>
                            <Line/>
                        </EaBox>
                    </View>
                )
            })}

        </Box>
    )
}
export default MyStory
