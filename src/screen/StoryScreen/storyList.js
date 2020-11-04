import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {Card} from 'react-native-paper';
import StoryDetail from "./StoryDetail"
import {storyLoader} from "../../action/story";
import {useDispatch, useSelector} from "react-redux";
import {ListItem} from "native-base";


const StoryList = ({props, storyType, changed, setChanged, setOnClickStory}) => {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const DetailData = useSelector((state) => state.story.story.data)
    const init = useRef(true);
    const [offset, setOffset] = useState(0);
    //Flat용
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [clientData, setClientData] = useState([]);
    const [serverData, serverDataLoaded] = useState([]);
    const [pending_process, setPending_process] = useState(true);
    const [loadmore, setLoadmore] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const flatListRef = useRef(null);

    const ApiRequest = async thePage => {
        await setTimeout(() => {
        }, 1500);
        return list.slice((thePage - 1) * limit, thePage * limit);
    };
    const requestToServer = async thePage => {
        let data = await ApiRequest(thePage);
        console.log('data', data);
        serverDataLoaded(data);
    };
console.log(list)

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

    useEffect(() => {
        console.log('requestToServer');
        requestToServer(page);
    }, []);
    useEffect(() => {
        console.log('obtained serverData', serverData);
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
        console.log('load more with page', page);
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
        setClientData([]);
        setPage(1);
        setRefresh(true);
        setPending_process(false);
    };
    const renderRow = ({item}) => {
        return (
            <View>
                <TouchableOpacity onPress={async () => {
                    await dispatch(storyLoader(item.id))
                    if (DetailData !== undefined) {
                        props.navigation.navigate("StoryDetail")
                    }
                    setOnClickStory(true)
                }}>
                    <Card>
                        <Card.Cover source={{
                            uri: item.Story_Files[0].file
                        }}/>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    };

        return (
            <>
                <LoadHandler storyType={storyType}/>
                <View>
                    {/*<TouchableOpacity onPress={()=>{*/}
                    {/*    props.navigation.navigate("FlatListPractice")*/}
                    {/*}}>*/}
                    {/*    <Text>*/}
                    {/*        아아*/}
                    {/*    </Text>*/}
                    {/*</TouchableOpacity>*/}
                    <FlatList
                        ref={flatListRef}
                        refreshing={refresh}
                        data={clientData}
                        renderItem={renderRow}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1}
                        onRefresh={() => onRefresh()}
                    />
                </View>
            </>
        )
}
export default StoryList;
