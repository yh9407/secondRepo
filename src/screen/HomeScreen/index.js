import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
} from 'react-native';
import {useSelector} from "react-redux";
import ListItem from "./ListItem";
import styled from 'styled-components';
import IP from "../../../Ip";

const HomeStyle=styled.ScrollView`
`
const HomeImage = styled.Image`
width: 100%;
height: 320px;
`
const ImageBox = styled.View`
width: 100%;
height: 320px;
`

const HomeScreen = (props) => {
    const [data, setData] = useState([])
    const signInData = useSelector((state) => state.auth.user)

    const getData = () => {
        const url = `${IP}/campaign/list/1`
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.list)
            })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <HomeStyle>

        <View style={{height:"100%", width:"100%"}}>
            <ListItem data={data} props={props}/>
        </View>
        </HomeStyle>
    );
}

export default HomeScreen;
