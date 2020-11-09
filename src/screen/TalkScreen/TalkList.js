import React, {useEffect, useState} from "react"
import {
    View,
    Button,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, Dimensions,
} from 'react-native';
import {Card, TextInput} from "react-native-paper";

import {useDispatch} from "react-redux";
import axios from "axios";
import styled from 'styled-components';
import {talkDetailLoader} from "../../action/talk";

const ListFrame = styled.FlatList`
display: flex;
padding: 15px 10px 15px 10px;
`

const List = styled.Text`
font-size: 20px;
`
const ListSection = styled.TouchableOpacity`
display: flex;
padding: 15px 10px 15px 10px;
border-style: solid;
border-bottom-color: black;
`

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const TalkList = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    const visitHandler = async (talk_id) => {
        await axios.put("http://192.168.0.59:3000/talk/visit", {talk_id: talk_id})
    }
    const getData = async () => {
        const url = "http://192.168.0.59:3000/talk/list/" + page
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(data.concat(responseJson.list))
            })
    }
    const renderRow = ({item, key}) => {
        return (
            <View key={key}>
                <ListSection onPress={async () => {
                    await dispatch(talkDetailLoader(item.id))
                    if (item.id !== undefined) {
                        props.navigation.navigate("TalkDetail")
                    }
                    await visitHandler(item.id)
                }}>
                    {!item.Talk_Files[0] ? null : <Card>
                        <Card.Cover source={{
                            uri: item.Talk_Files[0].file
                        }}/>

                    </Card>}
                    <View>
                        <List>
                            Title: {item.talk_title}
                        </List>
                        <List>
                            content : {item.talk_content}
                        </List>
                        <List>
                            작성자 : {item.user_email}
                        </List>
                    </View>
                </ListSection>
            </View>
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
    }, [page])

    return (
        <View>
            <ListFrame
                getItemLayout={getItemLayout}
                data={data}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}
export default TalkList;
