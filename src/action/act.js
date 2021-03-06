import axios from 'axios'
import IP from "../../Ip"

export const ACT_DETAIL_LOAD = "ACT_DETAIL_LOAD";
export const ACT_DETAIL_SUCCESS = "ACT_DETAIL_SUCCESS";
export const ACT_DETAIL_FAILURE = "ACT_DETAIL_FAILURE";

export const actDetailLoadStart = () => {
    return {type: ACT_DETAIL_LOAD}
}
export const actDetailLoadSuccess = (data) => {
    return {type: ACT_DETAIL_SUCCESS, data: data}
}
export const actDetailLoadFailure = () => {
    return {type: ACT_DETAIL_FAILURE}
}
export const actDetailLoader = (id) => async (dispatch) => {
    dispatch(actDetailLoadStart());
    await axios
        .get(`${IP}/act/${id}`)
        .then((response) => {
            dispatch(actDetailLoadSuccess(response.data.data));
        })
        .catch((error) => {
            dispatch(actDetailLoadFailure());
            console.log(error)
        })
}

