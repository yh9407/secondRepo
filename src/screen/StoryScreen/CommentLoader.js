import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {
    View,
    Text,
    ScrollView, Dimensions,
    FlatList,
    ActivityIndicator,
} from 'react-native';
const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const CommentStyle = styled.View`
display: flex;
width: 100%;
padding: 20px 10px 10px 20px;
`
const CommentBox = styled.View`
display: flex;
width: 80%;
height: 60px;
margin-bottom: 10px;
flex-direction: row;

`
const OrangeText = styled.Text`
color: orange;
font-size: 15px;
font-weight: bold;

`
const CommentProfile = styled.Image`
width: 40px;
height: 40px;
margin-right: 10px;
border-radius: 100px;
`

const CommentLoader = ({id}) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const getCommentData = async () => {
        console.log(page)
        const url = `http://121.144.131.216:3000/comment/list/${id}/${page}`
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(data.concat(responseJson.list))
            })
    }
    const renderRow = ({item, key}) => {
        return (
            <View key={key}>
                <CommentStyle>
                    <View key={key}>
                        <CommentBox>
                            <CommentProfile source={{
                                uri: item.User.user_profile
                            }}/>
                            <OrangeText>{item.User.nickname}</OrangeText>
                            <Text>
                                {'\u0020'} {'\u0020'} {'\u0020'} {item.comment}
                            </Text>
                        </CommentBox>
                    </View>

                </CommentStyle>
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
        getCommentData()
        setIsLoading(true)

    }, [page])
    return (
        <View>
            <FlatList
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
export default CommentLoader;


