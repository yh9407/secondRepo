import React, {useEffect, useRef, useState, useMemo} from "react"
import {
    View,
    Animated,
    Text,
    FlatList,
    Dimensions, TouchableOpacity,
} from 'react-native';
import {_} from 'lodash';
import {Card} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {storyLoader} from "../../action/story";

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const FlatListPractice = (props) => {
    const dispatch = useDispatch();
    const DetailData = useSelector((state) => state.story.story.data)
    const AllStoryData = useSelector((state) => state.story.allStory.data)
    const [limit, setLimit] = useState(3);
    const [page, setPage] = useState(1);
    const [clientData, setClientData] = useState([]);
    const [serverData, serverDataLoaded] = useState([]);
    const [pending_process, setPending_process] = useState(true);
    const [loadmore, setLoadmore] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const flatListRef = useRef(null);
    const [fadingIndex, setFadingIndex] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(false);
    const [offsetY, setOffsetY] = useState(0);
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [op, setOp] = useState(
        scrollY.interpolate({
            inputRange: [0, 50, 100, 150],
            outputRange: [1, 0.5, 0.25, 0],
        }),
    );
    const ApiRequest = async thePage => {
        await setTimeout(() => {
        }, 1500);
        console.log(thePage)
        return AllStoryData.slice((thePage - 1) * limit, thePage * limit);
    };
    const requestToServer = async thePage => {
        let data = await ApiRequest(thePage);
        serverDataLoaded(data);
    };
    useEffect(() => {
        if (serverData.length > 0) {
            setRefresh(false);
            setClientData([...clientData, ...serverData]);
            setLoadmore(serverData.length === limit);
            setPending_process(false);
        } else {
            setLoadmore(false);
        }
    }, [serverData]);

    useEffect(() => {
        if (serverData.length === limit || page === 1) {
            setPending_process(true);
            requestToServer(page);
        }
    }, [page]);
    const handleLoadMore = () => {
        if (loadmore && !pending_process) {
            setPage(page + 1)
        }
    }
    const onRefresh = () => {
        if (page !== 1) {
            setClientData([]);
            setPage(1);
            setRefresh(true);
            setPending_process(false);
        }
    };
    const renderRow = ({item, index}) => {
        return (
            <>
                <Animated.View
                    style={
                        index < fadingIndex && scrollDirection === "down" ? {opacity: op} : {}
                    }>
                    <View
                        style={{
                            height: ITEM_HEIGHT,
                        }}>
                        <Text>
                            {item.story_title}
                        </Text>
                        <TouchableOpacity
                            onPress={async () => {
                                await dispatch(storyLoader(item.id))
                                if (DetailData !== undefined) {
                                    props.navigation.navigate("StoryDetail")
                                }
                            }}>

                            <Card>
                                <Card.Cover source={{
                                    uri: item.Story_Files[0].file
                                }}/>
                            </Card>
                        </TouchableOpacity>
                        <Text>
                            {item && item.Hashtags.map((comment, key) => {
                                return (
                                    <Text key={key}>
                                        #{comment.hashtag}{'\u0020'}{'\u0020'}{'\u0020'}
                                    </Text>
                                )
                            })}
                        </Text>
                    </View>
                </Animated.View>
            </>

        );
    };
    const handleScroll = (event) => {
        let {contentOffset} = event.nativeEvent;
        let h = ITEM_HEIGHT;
        let reachingIndex = Math.ceil(contentOffset.y / h);
        setOffsetY(contentOffset.y)
        setScrollDirection(contentOffset.y > offsetY ? "down" : "up");

        let in_range = [0, h / 3, (h / 3) * 2, h];
        let out_range = [1, 0.5, 0.25, 0];
        let out_range_new = [];
        let in_range_new = [];
        let d = h / 3;
        for (let i = 0; i <= reachingIndex; i++) {
            out_range_new = _.concat(out_range_new, out_range);
            _.each(in_range, (val, index) => {
                let n = in_range_new.length + 1;
                let next_num = in_range[0] + (n - 1) * d;
                in_range_new.push(next_num);
            });
        }
        setOp(
            scrollY.interpolate({
                inputRange: in_range_new,
                outputRange: out_range_new,
            }),
        );
        setFadingIndex(reachingIndex);
    };
    const getItemLayout = (data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    })
    const keyExtractor = (item) => {
        item.id;
    }

    return useMemo(() => {
        return (

            <View>
                <Animated.FlatList
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {contentOffset: {y: scrollY}}
                            },
                        ],
                        {
                            useNativeDriver: true,
                            listener: handleScroll,
                        },
                    )}
                    getItemLayout={getItemLayout}
                    keyExtractor={keyExtractor}
                    ref={flatListRef}
                    refreshing={refresh}
                    data={clientData}
                    renderItem={renderRow}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    onRefresh={() => onRefresh()}
                />
            </View>
        );
    }, [clientData, fadingIndex]);
};
export default FlatListPractice;
