import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {storyLike, storyLoader} from "../../action/story";

import {
    View,
    Text,
    Button,
    Image,
    TouchableOpacity,
} from 'react-native';
const StoryLike = ({id,like}) => {
    const dispatch = useDispatch();
const likeHandler = () => {
        if(like.user) {
            dispatch(storyLike(id,true));
        }
        else{
            dispatch(storyLike(id,false));
        }
}
    const LikeButton = () => {
        if (like.user) {
            return (
                    <Button onPress={likeHandler} title="빈하트"/>
            )
        } else {
            return (
                <Button onPress={likeHandler} title="하트"/>
            )
        }
    }
    useEffect(() => {
        dispatch(storyLoader(id))
    }, [like.user])
    return (
       <View>
          <LikeButton/>
       </View>
    )
}
export default StoryLike;
