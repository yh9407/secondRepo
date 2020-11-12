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
import IP from "../../../Ip";
import {Card, TextInput} from "react-native-paper";

import {useDispatch} from "react-redux";
import axios from "axios";
import styled from 'styled-components';
import {talkDetailLoader} from "../../action/talk";

const TalkStyle = styled.View`
display: flex;
width: 100%;
margin-top: 40px;
`
const ListFrame = styled.FlatList`
display: flex;
`
const List = styled.Text`
font-size: 18px;
`
const ListSection = styled.TouchableOpacity`
display: flex;
height: 250px;
`
const WriterBox = styled.View`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
margin-left: 10px;
margin-bottom: 15px;

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
const ListContentBox = styled.View`
display: flex;
width: 300px;
margin-left: 20px;
margin-top: 10px;
justify-content: center;
`

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const TalkList = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const visitHandler = async (talk_id) => {
        await axios.put(`${IP}/talk/visit`, {talk_id: talk_id})
    }
    const getData = async () => {
        const url = `${IP}/talk/list/` + page
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(data.concat(responseJson.list))
            })
    }
    const renderRow = ({item, key}) => {
        return (
            <TalkStyle key={key}>
                <WriterBox>
                    {!item.User.user_profile ? null :
                        <WriterImage source={{
                            uri: item.User.user_profile
                        }}/>
                    }
                    <WriterText>
                        {item.User.nickname}
                    </WriterText>
                </WriterBox>
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

                    <ListContentBox>
                        <List>
                            {item.talk_title}
                        </List>
                    </ListContentBox>
                </ListSection>
            </TalkStyle>
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
