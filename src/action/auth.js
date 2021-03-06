import axios from "axios";
import IP from "../../Ip"

export const AUTH_SIGNIN = "AUTH_SIGNIN";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAILURE = "AUTH_SIGNIN_FAILURE";

export const AUTH_SIGNOUT = "AUTH_SIGNOUT";
export const AUTH_SIGNOUT_SUCCESS = "AUTH_SIGNOUT_SUCCESS";
export const AUTH_SIGNOUT_FAILURE = "AUTH_SIGNOUT_FAILURE";

export const MY_PAGE_INFO = "MY_PAGE_INFO";
export const MY_PAGE_INFO_SUCCESS = "MY_PAGE_INFO_SUCCESS";
export const MY_PAGE_INFO_FAILURE = "MY_PAGE_INFO_FAILURE";

export const myPageRoadStart = () => {
    return {type: MY_PAGE_INFO};
}
export const myPageRoadSuccess = (data) => {
    return {type: MY_PAGE_INFO_SUCCESS, data: data};
}
export const myPageRoadFailure = () => {
    return {type: MY_PAGE_INFO_FAILURE};
}

export const signInStart = () => {
    return {type: AUTH_SIGNIN};
}
export const signInSuccess = (data) => {
    return {type: AUTH_SIGNIN_SUCCESS, data: data};
}
export const signInFailure = () => {
    return {type: AUTH_SIGNIN_FAILURE};
}
export const signOutStart = () => {
    return {type: AUTH_SIGNOUT};
}
export const signOutSuccess = () => {
    return {type: AUTH_SIGNOUT_SUCCESS};
}
export const signOutFailure = () => {
    return {type: AUTH_SIGNOUT_FAILURE};
}

export const signInRequest = (user) => async (dispatch) => {
    dispatch(signInStart());
    await axios
        .post(`${IP}/auth/signIn`, {...user})
        .then((response) => {
            if (response.data.success === 1) {
                dispatch(signInSuccess(response.data));
            }
        })
        .catch((error) => {
            dispatch(signInFailure())
        })
}
export const signOutRequest = () => async (dispatch) => {
    dispatch(signOutStart());
    await axios
        .post(`${IP}/auth/signOut`)
        .then((response) => {
            dispatch(signOutSuccess())
        })
        .catch((error) => {
            console.log(error)
            dispatch(signOutFailure())
        })
}

export const myPageRequest = (data) => async (dispatch) => {
    dispatch(myPageRoadStart());
    await axios
        .post(`${IP}/mypage/init`, {...data})
        .then((response) => {
            dispatch(myPageRoadSuccess(response.data))
        })
        .catch((error) => {
            console.log(error)
            dispatch(myPageRoadFailure())
        })
}

