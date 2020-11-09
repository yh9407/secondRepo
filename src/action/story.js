import axios from 'axios'

export const ALL_STORY_LOAD = "ALL_STORY_LOAD";
export const ALL_STORY_LOAD_SUCCESS = "ALL_STORY_LOAD_SUCCESS";
export const ALL_STORY_LOAD_FAILURE = "ALL_STORY_LOAD_FAILURE";


export const STORY_LOAD = "STORY_LIST_LOAD";
export const STORY_LOAD_SUCCESS = "STORY_LIST_LOAD_SUCCESS";
export const STORY_LOAD_FAILURE = "STORY_LIST_LOAD_FAILURE";


export const STORY_COMMENT_LOAD = "STORY_COMMENT_LOAD";
export const STORY_COMMENT_LOAD_SUCCESS = "STORY_COMMENT_LOAD_SUCCESS";
export const STORY_COMMENT_LOAD_FAILURE = "STORY_COMMENT_LOAD_FAILURE";

export const STORY_LIKE = "STORY_LIKE";
export const STORY_LIKE_SUCCESS = "STORY_LIKE_SUCCESS";
export const STORY_LIKE_FAILURE = "STORY_LIKE_FAILURE";

export const STORY_VOTE = "STORY_VOTE";
export const STORY_VOTE_SUCCESS = "STORY_VOTE_SUCCESS";
export const STORY_VOTE_FAILURE = "STORY_VOTE_FAILURE";


export const allStoryLoad = () => {
    return {type: ALL_STORY_LOAD}
}
export const allStoryLoadSuccess = (data) => {
    return {type: ALL_STORY_LOAD_SUCCESS, data: data}
}
export const allStoryLoadFailure = () => {
    return {type: ALL_STORY_LOAD_FAILURE}
}

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
export const storyLikeStart = () => {
    return {type: STORY_LIKE}
}
export const storyLikeSuccess = () => {
    return {type: STORY_LIKE_SUCCESS}
}
export const storyLikeFailure = () => {
    return {type: STORY_LIKE_FAILURE}
}

export const storyVoteStart = () => {
    return {type: STORY_VOTE}
}
export const storyVoteSuccess = () => {
    return {type: STORY_VOTE_SUCCESS}
}
export const storyVoteFailure = () => {
    return {type: STORY_VOTE_FAILURE}
}

export const allStoryLoader = () => async (dispatch) => {
    dispatch(allStoryLoad());
    await axios
        .get("http://192.168.0.59:3000/story/list/1?type=all")
        .then((response) => {
            dispatch(allStoryLoadSuccess(response.data.list));
        })
        .catch((error) => {
            dispatch(allStoryLoadFailure());
            console.log(error)
        })
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
export const storyVote = (id, status) => async (dispatch) => {
    dispatch(storyVoteStart());
    await axios
        .put("http://192.168.0.59:3000/story/vote", {story_id: id, status: status})
        .then(() => {
            dispatch(storyVoteSuccess());
        })
        .catch((error) => {
            console.log(error);
            dispatch(storyVoteFailure())
        })
};
export const storyLike = (id, status) => async (dispatch) => {
    dispatch(storyLikeStart());
    await axios
        .put("http://192.168.0.59:3000/story/like", {story_id: id, status:status})
        .then(() => {
            dispatch(storyLikeSuccess());
        })
        .catch((error) => {
            console.log(error)
            dispatch(storyLikeFailure());
        });
}




