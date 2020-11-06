import React, {useEffect, useRef, useState} from 'react';
import StoryNavScreen from "./storyNav"
import {View,TouchableOpacity,Text,Button} from "react-native";
import {allStoryLoader} from "../../action/story";
import {useDispatch, useSelector} from "react-redux";
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
            <View>
                <Button onPress={()=> props.navigation.navigate("Exam")} title="스토리 보러가기"/>
            </View>
        </>
    )
}
export default StoryScreen;
