import axios from 'axios'

export const TALK_DETAIL_LOAD = "TALK_DETAIL_LOAD";
export const TALK_DETAIL_SUCCESS = "TALK_DETAIL_SUCCESS";
export const TALK_DETAIL_FAILURE = "TALK_DETAIL_FAILURE";

export const talkDetailLoadStart = () => {
    return {type: TALK_DETAIL_LOAD}
}
export const talkDetailLoadSuccess = (data) => {
    return {type: TALK_DETAIL_SUCCESS, data: data}
}
export const talkDetailLoadFailure = () => {
    return {type: TALK_DETAIL_FAILURE}
}
export const talkDetailLoader = (id) => async (dispatch) => {
    dispatch(talkDetailLoadStart());
    await axios
        .get(`http://121.144.131.216:3000/talk/${id}`)
        .then((response) => {
            dispatch(talkDetailLoadSuccess(response.data.data));
        })
        .catch((error) => {
            dispatch(talkDetailLoadFailure());
            console.log(error)
        })
}
