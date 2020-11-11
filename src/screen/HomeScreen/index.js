import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
} from 'react-native';
import {useSelector} from "react-redux";
import CampaignList from "./CampaignList";
import ListItem from "./ListItem";
import styled from 'styled-components';
import Images from "../../../public/pictures/"

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
        const url = "http://121.144.131.216:3000/campaign/list/1"
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
