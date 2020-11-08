import React, {useEffect, useState} from "react"
import axios from "axios"
import {
    View,
    Button,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Card, TextInput} from "react-native-paper";
import {storyLoader} from "../../action/story";

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;


const Exam = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const DetailData = useSelector((state) => state.story.story.data)
    const AllStoryData = useSelector((state) => state.story.allStory.data)
    const [storyType, setStoryType] = useState("hot")

    const visitHandler = async (story_id) => {
        await axios.put("http://121.144.131.216:3000/story/visit", {story_id: story_id})
    }

    const getData = async () => {
        const url = "http://121.144.131.216:3000/story/list/" + page + "?type=" + storyType
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(data.concat(responseJson.list))
            })
    }
    const renderRow = ({item, key}) => {
        return (
            <View key={key}>
                <View>
                    <Text style={styles.itemText}>
                        Title : {item.story_title}
                    </Text>
                </View>
                <TouchableOpacity style={styles.item}
                                  onPress={async () => {
                                      await dispatch(storyLoader(item.id))
                                      if (DetailData !== undefined) {
                                          props.navigation.navigate("StoryDetail")
                                      }
                                      await visitHandler(item.id)
                                  }}>
                    {!item.Story_Files[0] ? null :
                        <Card style={styles.itemImage}>
                            <Card.Cover source={{
                                uri: item.Story_Files[0].file
                            }}/>
                        </Card>}
                </TouchableOpacity>
                <Text>
                    해시태그 : {item && item.Hashtags.map((comment, key) => {
                    return (
                        <>
                            <Text key={key}>
                                #{comment.hashtag}{'\u0020'}{'\u0020'}{'\u0020'}
                            </Text>
                        </>
                    )
                })}
                </Text>
            </View>
        )
    }
    const handleLoadMore = () => {
        setPage(page + 1)

    }
    const renderFooter = () => {
        return (
            isLoading ?
                <View style={styles.loader}>
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
            <View>
                <Button title="인기스토리" onPress={() => setStoryType("hot")
                }/>
                <Button title="최신스토리" onPress={() => setStoryType("new")
                }/>
                <Button title="지난스토리" onPress={() => setStoryType("past")
                }/>
            </View>
            <FlatList
                getItemLayout={getItemLayout}
                style={styles.container}
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
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: "lightgray"
    },
    loader: {
        marginTop: 10,
        alignItems: "center"
    },
    item: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    line: {
        borderBottomColor: "black",
        borderBottomWidth: 10,
    },
    itemImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    itemText: {
        fontSize: 16,
        padding: 5
    }
})
export default Exam;
