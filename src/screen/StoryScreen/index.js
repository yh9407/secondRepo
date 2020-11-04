import React, {useState} from 'react';
import StoryNavScreen from "./storyNav"
import {View, ScrollView,Text,FlatList} from "react-native";
import StoryList from "./storyList";
const StoryScreen = (props) => {
    const [changed, setChanged] = useState(false);
    const [storyType, setStoryType] = useState("hot");
    const [onClickStory, setOnClickStory] = useState(false)
    return (
        <>

            <View>
                <StoryNavScreen
                    storyType={storyType}
                    setStoryType={setStoryType}
                    setChanged={setChanged}/>
            </View>
            <View>

                <StoryList
                    props={props}
                    storyType={storyType}
                    changed={changed}
                    setOnClickStory={setOnClickStory}
                    setChanged={setChanged}/>
            </View>
        </>
    )
}
export default StoryScreen;
