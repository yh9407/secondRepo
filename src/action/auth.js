import axios from "axios";

export const AUTH_SIGNIN = "AUTH_SIGNIN";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAILURE = "AUTH_SIGNIN_FAILURE";

export const AUTH_SIGNOUT = "AUTH_SIGNOUT";
export const AUTH_SIGNOUT_SUCCESS = "AUTH_SIGNOUT_SUCCESS";
export const AUTH_SIGNOUT_FAILURE = "AUTH_SIGNOUT_FAILURE";

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
        .post("http://192.168.0.59:3000/auth/signIn", {...user})
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
        .post("http://192.168.0.59:3000/auth/signOut")
        .then((response) => {
            dispatch(signOutSuccess())
        })
        .catch((error) => {
            console.log(error)
            dispatch(signOutFailure())
        })
}

