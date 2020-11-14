import React from "react"
import {useSelector ,useDispatch} from "react-redux";
import styled from 'styled-components';
import {
    View,
    Text,
} from 'react-native';

const MyStory = () => {
    const dispatch = useDispatch();
    const myPageData = useSelector((state) => state.auth.myPage.list)
console.log(myPageData.storyList)
}
export default MyStory
