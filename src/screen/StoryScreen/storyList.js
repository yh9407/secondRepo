import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import StoryDetail from "./StoryDetail"
import {storyLoader} from "../../action/story";
import {useDispatch, useSelector} from "react-redux";


const StoryList = ({props,storyType, changed, setChanged, setOnClickStory}) => {
    const [list, setList] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const DetailData = useSelector((state) => state.story.story.data)
    const init = useRef(true);


    const LoadHandler = () => {
        const loadInit = async () => {
            setLoading(true);
            const initData = await axios.get(`http://192.168.0.59:3000/story/list/1?type=${storyType}`)
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
                        <TouchableOpacity onPress={async () => {
                            await dispatch(storyLoader(story.id))
                            if(DetailData!==undefined){
                             props.navigation.navigate("StoryDetail")}
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
