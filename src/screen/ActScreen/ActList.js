import React, {useEffect, useState} from "react"
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity, Dimensions,
    ActivityIndicator
} from 'react-native';
import IP from "../../../Ip"
import {useDispatch} from "react-redux";
import styled from 'styled-components';
import axios from "axios"
import {Card, TextInput} from "react-native-paper";
import {actDetailLoader} from "../../action/act";
import Time from "./Time";

const ActStyle = styled.View`
display: flex;
width: 100%;
margin-top: 20px;
`
const ListFrame = styled.FlatList`
display: flex;
`
const ListTitleBox = styled.View`
display: flex;
width: 100%;
`
const ListTitle = styled.Text`
font-size: 20px;
margin-left: 10px;
`
const ContentBox = styled.View`
display: flex;
width: 100%;
margin-top: 35px;
margin-left: 15px;

`
const ListContent = styled.Text`
font-size: 17px;
`
const ListSection = styled.TouchableOpacity`
display: flex;
padding: 15px 10px 15px 10px;
border-style: solid;
height: 300px;
border-bottom-color: black;
`
const LineBox = styled.View`
display: flex;
width: 100%;
align-items: center;
margin-bottom: 20px;
`
const Line = styled.View`
width: 89%;
border-bottom-color: orange;
border-bottom-width: 0.9px;
`
const TimeBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 96%;
`
const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const ActList = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const visitHandler = async (act_id) => {
        await axios.put(`${IP}/act/visit`, {act_id: act_id})
    }

    const getData = async () => {
        const url = `${IP}/act/list/` + page
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(data.concat(responseJson.list))
            })
    }
    const renderRow = ({item, key}) => {
        return (
            <ActStyle key={key}>
                <ListTitle>
                    {item.act_title}
                </ListTitle>
                <TimeBox>
                    <Time created={item.created_at}/>
                </TimeBox>
                <ListSection onPress={async () => {
                    await dispatch(actDetailLoader(item.id))
                    if (item.id !== undefined) {
                        props.navigation.navigate("ActDetail")
                    }
                    await visitHandler(item.id)
                }}>
                    {!item.Act_Files[0] ? null : <Card>
                        <Card.Cover source={{
                            uri: item.Act_Files[0].file
                        }}/>
                    </Card>}
                    <ContentBox>
                        <ListContent>
                            {item.act_content}
                        </ListContent>
                    </ContentBox>
                </ListSection>
                <LineBox>
                    <Line/>
                </LineBox>
            </ActStyle>
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
export default ActList;
