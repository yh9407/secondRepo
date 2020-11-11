import axios from 'axios'

export const COMMENT_ADD = "COMMENT_ADD";
export const COMMENT_ADD_SUCCESS = "COMMENT_ADD_SUCCESS";
export const COMMENT_ADD_FAILURE = "COMMENT_ADD_FAILURE";

export const commentAddStart = () => {
    return {type: COMMENT_ADD};
};
export const commentAddSuccess = () => {
    return {type: COMMENT_ADD_SUCCESS};
};
export const commentAddFailure = () => {
    return {type: COMMENT_ADD_FAILURE};
};

export const commentAdd = (data) => async (dispatch) => {
    console.log(data)
    dispatch(commentAddStart());
    await axios
        .post("http://121.144.131.216:3000/comment/add", {...data})
        .then((response) => {
            console.log(response)
            dispatch(commentAddSuccess());
        })
        .catch((error) => {
            dispatch(commentAddFailure(error))
        })
}

