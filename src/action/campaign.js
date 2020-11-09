import axios from 'axios'
import {
    TALK_DETAIL_FAILURE,
    TALK_DETAIL_LOAD,
    TALK_DETAIL_SUCCESS, talkDetailLoadFailure,
    talkDetailLoadStart,
    talkDetailLoadSuccess
} from "./talk";

export const CAMPAIGN_DETAIL_LOAD = "CAMPAIGN_DETAIL_LOAD";
export const CAMPAIGN_DETAIL_SUCCESS = "CAMPAIGN_DETAIL_SUCCESS";
export const CAMPAIGN_DETAIL_FAILURE = "CAMPAIGN_DETAIL_FAILURE";

export const campaignDetailLoadStart = () => {
    return {type: CAMPAIGN_DETAIL_LOAD}
}
export const campaignDetailLoadSuccess = (data) => {
    return {type: CAMPAIGN_DETAIL_SUCCESS, data: data}
}
export const campaignDetailLoadFailure = () => {
    return {type: CAMPAIGN_DETAIL_FAILURE}
}
export const campaignDetailLoader = (id) => async (dispatch) => {
    dispatch(campaignDetailLoadStart());
    await axios
        .get(`http://192.168.0.59:3000/campaign/${id}`)
        .then((response) => {
            dispatch(campaignDetailLoadSuccess(response.data.data));
        })
        .catch((error) => {
            dispatch(campaignDetailLoadFailure());
            console.log(error)
        })
}
