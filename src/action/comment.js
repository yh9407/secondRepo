import axios from 'axios'
import IP from "../../Ip"

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
    dispatch(commentAddStart());
    await axios
        .post(`${IP}/comment/add`, {...data})
        .then((response) => {
            dispatch(commentAddSuccess());
        })
        .catch((error) => {
            dispatch(commentAddFailure(error))
        })
}

