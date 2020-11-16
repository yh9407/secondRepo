import React, {useEffect, useState} from "react"
import axios from "axios"
import styled from 'styled-components';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Button,
    Animated,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, Dimensions,
} from 'react-native';
import IP from "../../../Ip";
import {useDispatch, useSelector} from "react-redux";
import {storyLoader} from "../../action/story";
import TimeSet from "./TimeSet";

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const StoryStyle = styled.View`
display: flex;
width: 100%;
margin-top: 40px;
`
const StoryHeader = styled.View`
display: flex;
width: 100%;
height: 40px;
align-items: center;
margin-top: 5px;
`
const HeaderText = styled.Text`
font-weight: bold;
color: orange;
font-size: 25px;
`

const StoryImage = styled.Image`
width: 100%;
height: 280px;
`
const HashTag = styled.View`
display: flex;
margin-top: 10px;
margin-left: 10px;
flex-direction: row;
width: 30%;
justify-content: space-between;
`
const TagBox = styled.View`
margin-left: 10px;
`
const FontYellow = styled.Text`
font-size: 18px;
color: #ffa400;
`

const CommentProfile = styled.Image`
width: 40px;
height: 40px;
margin-right: 10px;
border-radius: 100px;
`
const WriterBox = styled.View`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
margin-left: 10px;

`
const TimeBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 95%;
margin-left: 10px;
margin-bottom: 10px;
`
const WriterImage = styled.Image`
width: 40px;
height: 40px;
border-radius: 50px;
`
const WriterText = styled.Text`
margin-left: 10px;
font-size: 17px;
color: black;
`
const LineBox = styled.View`
display: flex;
margin-top: 30px;
width: 100%;
align-items: center;
`
const Line = styled.View`
width: 89%;
border-bottom-color: orange;
border-bottom-width: 0.9px;
`
const Exam = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const DetailData = useSelector((state) => state.story.story.data)
    const AllStoryData = useSelector((state) => state.story.allStory.data)
    const [storyType, setStoryType] = useState("hot")

    const visitHandler = async (story_id) => {
        await axios.put(`${IP}/story/visit`, {story_id: story_id})
    }

    const getData = async () => {
        const url = `${IP}/story/list/` + page + "?type=" + storyType
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(data.concat(responseJson.list))
            })
    }

    const renderRow = ({item, key}) => {
        return (
            <StoryStyle key={item.id}>
                <WriterBox>
                    {!item.User.user_profile ? null :
                        <WriterImage source={{
                            uri: item.User.user_profile
                        }}/>}

                    {!item.User.nickname ? null :
                        <WriterText>
                            {item.User.nickname}
                        </WriterText>}
                </WriterBox>
                <TimeBox>
                    <Text>
                        <TimeSet At={item.createdAt}/>
                    </Text>
                </TimeBox>
                <TouchableOpacity
                    onPress={async () => {
                        await dispatch(storyLoader(item.id))
                        if (DetailData !== undefined) {
                            props.navigation.navigate("StoryDetail")
                        }
                        await visitHandler(item.id)
                    }}>
                    {!item.Story_Files[0] ? null :
                        <View>
                            <StoryImage source={{
                                uri: item.Story_Files[0].file
                            }}/>
                        </View>
                    }
                </TouchableOpacity>
                <HashTag>
                    {item && item.Hashtags.map((comment, key) => {
                        return (

                            <TagBox key={key}>
                                <FontYellow>
                                    #{comment.hashtag}
                                </FontYellow>
                            </TagBox>
                        )
                    })}
                </HashTag>
                <LineBox>
                    <Line/>
                </LineBox>
            </StoryStyle>

        )
    }
    const handleLoadMore = () => {
        setPage(page + 1)

    }
    const renderFooter = () => {
        return (
            isLoading ?
                <View>
                    <ActivityIndicator size="large"/>
                </View> : null
        )
    }

    const getItemLayout = (data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    })


    useEffect(() => {
        getData()
        setIsLoading(true)

    }, [storyType, page])

    return (
        <>
            <FlatList
                getItemLayout={getItemLayout}
                data={data}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </>
    )
}

export default Exam;
