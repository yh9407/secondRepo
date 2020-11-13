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
import {talkDetailLoader, talkLike} from "../../action/talk";


const LoveImage=styled.Image`
width: 30px;
height: 30px;
`

const TalkLike = ({id, like}) => {
    const dispatch = useDispatch();
    const likeHandler = () => {
        if (like.user) {
            dispatch(talkLike(id, true));
        } else {
            dispatch(talkLike(id, false));
        }
    }

    useEffect(() => {
        dispatch(talkDetailLoader(id))
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
export default TalkLike;
