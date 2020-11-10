import React, {useEffect, useRef, useState} from 'react';
import StoryNavScreen from "./storyNav"
import {View, TouchableOpacity, TouchableHighlight, Text, Button} from "react-native";
import {allStoryLoader} from "../../action/story";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import Images from "../../../public/pictures"

const StoryListStyle = styled.View`
display: flex;
`
const StoryItem = styled.TouchableHighlight`
width: 100%;
height: 190px;

`
const ItemText = styled.Text`
font-size: 24px;
color: white;
`
const TextView= styled.View`
display: flex;
width: 100%;
height: 100%;
margin-left: 10px;
justify-content: center;
position: absolute;
`
const ListImage = styled.Image`
width: 100%;
height: 170px;
`

const StoryScreen = (props) => {

    const [changed, setChanged] = useState(false);
    const [storyType, setStoryType] = useState("hot");
    const AllStoryData = useSelector((state) => state.story.allStory.data)
    const init = useRef(true);
    const dispatch = useDispatch();

    console.log(AllStoryData.length)
    useEffect(() => {
        dispatch(allStoryLoader())
    }, [])
    return (
        <>
            <StoryItem>
                <TouchableHighlight onPress={() => props.navigation.navigate("Exam")}
                                    activeOpacity={0.6}
                                    underlayColor="lightgray">
                    <View>
                        <ListImage source={Images.list.story}/>
                        <TextView>
                        <ItemText>
                            STORY
                        </ItemText>
                        </TextView>
                    </View>
                </TouchableHighlight>
        </StoryItem>
            <StoryItem>
            <TouchableHighlight onPress={() => props.navigation.navigate("ActList")}
                                activeOpacity={0.6}
                                underlayColor="lightgray">
                <View>
                    <ListImage source={Images.list.act}/>
                    <TextView>
                        <ItemText>
                            ACT
                        </ItemText>
                    </TextView>
                </View>
            </TouchableHighlight>
            </StoryItem>
            <StoryItem>
                <TouchableHighlight onPress={() => props.navigation.navigate("TalkList")}
                                    activeOpacity={0.6}
                                    underlayColor="lightgray">
                    <View>
                        <ListImage source={Images.list.talk}/>
                        <TextView>
                            <ItemText>
                                TALK
                            </ItemText>
                        </TextView>
                    </View>
                </TouchableHighlight>
            </StoryItem>
        </>
    )
}
export default StoryScreen;
