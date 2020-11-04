import axios from "axios";

export const AUTH_SIGNIN = "AUTH_SIGNIN";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAILURE = "AUTH_SIGNIN_FAILURE";

export const signInStart = () => {
    return {type: AUTH_SIGNIN};
}
export const signInSuccess = (data) => {
    return {type: AUTH_SIGNIN_SUCCESS,data:data};
}
export const signInFailure = () => {
    return {type: AUTH_SIGNIN_FAILURE};
}
export const signInRequest = (user) => async (dispatch) => {
    dispatch(signInStart());
    await axios
        .post("http://192.168.0.59:3000/auth/signIn",{...user})
        .then((response) => {
            if (response.data.success === 1) {
                dispatch(signInSuccess(response.data));
            }
        })
        .catch((error) => {
            dispatch(signInFailure())
        })

}

