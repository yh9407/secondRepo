import React, {useEffect, useState} from "react"
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity, Dimensions,
    ActivityIndicator
} from 'react-native';
import {useDispatch} from "react-redux";
import styled from 'styled-components';
import axios from "axios"
import {Card, TextInput} from "react-native-paper";
import {actDetailLoader} from "../../action/act";


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

const ActList = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    const visitHandler = async (act_id) => {
        await axios.put("http://192.168.0.59:3000/act/visit", {act_id: act_id})
    }

    const getData = async () => {
        const url = "http://192.168.0.59:3000/act/list/" + page
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
                    <View>
                        <List>
                            Title: {item.act_title}
                        </List>
                        <List>
                            content : {item.act_content}
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
export default ActList;
