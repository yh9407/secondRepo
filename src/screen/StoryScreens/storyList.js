import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import {storyLoader} from "../../action/story";


const StoryList = ({storyType, changed, setChanged, setStoryId, setOnClickStory}) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const init = useRef(true);
    const [clickedStory, setClickedStory] = useState(false);

    const LoadHandler = () => {
        const loadInit = async () => {
            setLoading(true);
            const initData = await axios.get(`http://121.144.131.216:3000/story/list/1?type=${storyType}`)
            setList(initData.data.list);
        }

        useEffect(() => {
            if (init.current) {
                loadInit();
                init.current = false;
            }
        }, [])
        return null;
    }
    useEffect(() => {
        if (changed) {
            setChanged(false)
            init.current = true;
        }
    }, [changed])

    return (
        <>
            <LoadHandler storyType={storyType}/>
            <View>
                {list !== undefined && list.map((story, key) => {
                    return <View key={key}>
                        <Text>
                            {story.story_title}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setStoryId(story.id)
                            setOnClickStory(true)
                        }}>
                            <Card>
                                <Card.Cover source={{
                                    uri: story.Story_Files[0].file
                                }}/>
                            </Card>
                        </TouchableOpacity>

                    </View>
                })}
            </View>
        </>
    )
}
export default StoryList;
