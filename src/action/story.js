import axios from 'axios'

export const STORY_LOAD = "STORY_LIST_LOAD";
export const STORY_LOAD_SUCCESS = "STORY_LIST_LOAD_SUCCESS";
export const STORY_LOAD_FAILURE = "STORY_LIST_LOAD_FAILURE";

export const STORY_COMMENT_LOAD = "STORY_COMMENT_LOAD";
export const STORY_COMMENT_LOAD_SUCCESS = "STORY_COMMENT_LOAD_SUCCESS";
export const STORY_COMMENT_LOAD_FAILURE = "STORY_COMMENT_LOAD_FAILURE";

export const storyLoadStart = () => {
    return {type: STORY_LOAD}
}
export const storyLoadSuccess = (data) => {
    return {type: STORY_LOAD_SUCCESS, data: data}
}
export const storyLoadFailure = () => {
    return {type: STORY_LOAD_FAILURE}
}

export const storyCommentLoadStart = () => {
    return {type: STORY_COMMENT_LOAD}
}
export const storyCommentLoadSuccess = (list) => {
    return {type: STORY_COMMENT_LOAD_SUCCESS, list: list}
}
export const storyCommentLoadFailure = () => {
    return {type: STORY_COMMENT_LOAD_FAILURE}
}

export const storyLoader = (id) => async (dispatch) => {
    dispatch(storyLoadStart());
    await axios
        .get(`http://192.168.0.59:3000/story/${id}`)
        .then((response) => {
                dispatch(storyLoadSuccess(response.data.data));
        })
        .catch((error) => {
            dispatch(storyLoadFailure());
            console.log(error)
        })
}
export const storyCommentLoader = (commentId) => async (dispatch) => {
    dispatch(storyCommentLoadStart());
    await axios
        .get(`http://192.168.0.59:3000/comment/list/${commentId}/1`)
        .then((response) => {
            dispatch(storyCommentLoadSuccess(response.data.list))
        })
        .catch((error) => {
            dispatch(storyCommentLoadFailure());
            console.log(error)
        })

}




