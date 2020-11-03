import React, {useEffect, useState} from 'react';
import StoryNavScreen from "../StoryScreens/storyNav"
import {View, ScrollView} from "react-native";
import StoryList from "../StoryScreens/storyList";
import StoryDetail from "./StoryDetail";
import {useDispatch, useSelector} from "react-redux";
import {storyLoader} from "../../action/story";


const StoryScreen = (props) => {
    const dispatch = useDispatch();
    const [changed, setChanged] = useState(false);
    const [storyType, setStoryType] = useState("hot");
    const [storyId, setStoryId] = useState("0");
    const [onClickStory, setOnClickStory] = useState(false)
    const DataStatus = useSelector((state) => state.story.story.status)
console.log(DataStatus)
    console.log(onClickStory)
    useEffect(() => {
        dispatch(storyLoader(storyId))

    }, [storyId])
    return (
        <>
            <View>
                {onClickStory ? (null):<StoryNavScreen
                    storyType={storyType}
                    setStoryType={setStoryType}
                    setChanged={setChanged}/> }
            </View>
            <ScrollView>
                {onClickStory && DataStatus==="SUCCESS" ? (<StoryDetail
                        storyId={storyId}
                        onClickStory={onClickStory}
                        setOnClickStory={setOnClickStory}
                    />)
                    :
                    (<StoryList
                        setStoryId={setStoryId}
                        storyType={storyType}
                        changed={changed}
                        setOnClickStory={setOnClickStory}
                        setChanged={setChanged}/>)}
            </ScrollView>
        </>

    )
}
export default StoryScreen;
