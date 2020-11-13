import axios from 'axios'
import IP from "../../Ip"
import {
    STORY_LIKE,
    STORY_LIKE_FAILURE,
    STORY_LIKE_SUCCESS,
    storyLikeFailure,
    storyLikeStart,
    storyLikeSuccess
} from "./story";

export const TALK_DETAIL_LOAD = "TALK_DETAIL_LOAD";
export const TALK_DETAIL_SUCCESS = "TALK_DETAIL_SUCCESS";
export const TALK_DETAIL_FAILURE = "TALK_DETAIL_FAILURE";

export const TALK_COMMENT_ADD = "TALK_COMMENT_ADD";
export const TALK_COMMENT_ADD_SUCCESS = "TALK_COMMENT_ADD_SUCCESS";
export const TALK_COMMENT_ADD_FAILURE = "TALK_COMMENT_ADD_FAILURE";

export const TALK_LIKE = "TALK_LIKE";
export const TALK_LIKE_SUCCESS = "TALK_LIKE_SUCCESS";
export const TALK_LIKE_FAILURE = "TALK_LIKE_FAILURE";

export const talkDetailLoadStart = () => {
    return {type: TALK_DETAIL_LOAD}
}
export const talkDetailLoadSuccess = (data) => {
    return {type: TALK_DETAIL_SUCCESS, data: data}
}
export const talkDetailLoadFailure = () => {
    return {type: TALK_DETAIL_FAILURE}
}
export const talkCommentAddStart = () => {
    return {type: TALK_COMMENT_ADD};
};
export const talkCommentAddSuccess = () => {
    return {type: TALK_COMMENT_ADD_SUCCESS};
};
export const talkCommentAddFailure = () => {
    return {type: TALK_COMMENT_ADD_FAILURE};
};
export const talkLikeStart = () => {
    return {type: TALK_LIKE}
}
export const talkLikeSuccess = () => {
    return {type: TALK_LIKE_SUCCESS}
}
export const talkLikeFailure = () => {
    return {type: TALK_LIKE_FAILURE}
}

export const talkDetailLoader = (id) => async (dispatch) => {
    dispatch(talkDetailLoadStart());
    await axios
        .get(`${IP}/talk/${id}`)
        .then((response) => {
            dispatch(talkDetailLoadSuccess(response.data.data));
        })
        .catch((error) => {
            dispatch(talkDetailLoadFailure());
            console.log(error)
        })
}
export const talkCommentAdd = (data) => async (dispatch) => {
    dispatch(talkCommentAddStart());
    await axios
        .post(`${IP}/talk_comment/add`, {...data})
        .then((response) => {
            dispatch(talkCommentAddSuccess());
        })
        .catch((error) => {
            dispatch(talkCommentAddFailure(error))
        })
}

export const talkLike = (id, status) => async (dispatch) => {
    dispatch(talkLikeStart());
    await axios
        .put(`${IP}/talk/like`, {talk_id: id, status:status})
        .then(() => {
            dispatch(talkLikeSuccess());
        })
        .catch((error) => {
            console.log(error)
            dispatch(talkLikeFailure());
        });
}

