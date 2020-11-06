import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {storyLike} from "../../action/story";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
const StoryLike = (DetailData) => {
    const dispatch = useDispatch();

const likeHandler = (status) => {
        dispatch(storyLike(DetailData.id,status))
}
const icon = require("../../../public/icons/hugus.png")
    return (
       <Image source={icon}/>
    )
}
export default StoryLike;
