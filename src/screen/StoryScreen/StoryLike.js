import React, {useEffect} from "react"
import {useDispatch} from "react-redux";
import {storyLike, storyLoader} from "../../action/story";
import styled from 'styled-components';

import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Images from "../../../public/icons";

const Title= styled.View`
margin-top: 100px;
width: 80%;
`
const LoveImage=styled.Image`
width: 30px;
height: 30px;
`

const StoryLike = ({id, like}) => {
    const dispatch = useDispatch();
    const likeHandler = () => {
        if (like.user) {
            dispatch(storyLike(id, true));
        } else {
            dispatch(storyLike(id, false));
        }
    }

    useEffect(() => {
        dispatch(storyLoader(id))
    }, [like.user])

    return (
        <View>
            {like.user ? (<View>
                <TouchableOpacity onPress={likeHandler}>
                    <LoveImage source={Images.love.fullLove}/>
                </TouchableOpacity>
            </View>) : (<View>
                <TouchableOpacity onPress={likeHandler} >
                    <LoveImage source={Images.love.emptyLove}/>
                </TouchableOpacity>
            </View>)}
        </View>
    )
}
export default StoryLike;
