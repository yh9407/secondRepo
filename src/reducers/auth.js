import
{
    AUTH_SIGNIN,
    AUTH_SIGNIN_SUCCESS,
    AUTH_SIGNIN_FAILURE,
    AUTH_SIGNOUT,
    AUTH_SIGNOUT_SUCCESS,
    AUTH_SIGNOUT_FAILURE,
    MY_PAGE_INFO,
    MY_PAGE_INFO_SUCCESS,
    MY_PAGE_INFO_FAILURE,
} from '../action/auth'

import update from "react-addons-update"
import act from "./act";

const initialState = {
    signIn: {
        status: "INIT"
    },
    signOut: {
        status: "INIT"
    },
    user: {
        isLoggedIn: false,
        email: "",
        nickname: "",
        phone_number: "",
        profile: "",
        hash_email: "",
    },
    myPage: {
        status: "INIT",
        list: ""
    }
}
export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_SIGNIN:
            return update(state, {
                signIn: {
                    status: {$set: "WAITING"}
                }
            })
        case AUTH_SIGNIN_SUCCESS:
            return update(state, {
                user: {
                    isLoggedIn: {$set: true},
                    email: {$set: action.data.email},
                    nickname: {$set: action.data.nickname},
                    hash_email: {$set: action.data.hash_email},
                    phone_number: {$set: action.data.phone_number},
                    profile: {$set: action.data.profile},
                },
                signIn: {
                    status: {$set: "SUCCESS"}
                }
            })
        case AUTH_SIGNIN_FAILURE:
            return update(state, {
                signIn: {
                    status: {$set: "FAILURE"}
                },
            })
        case MY_PAGE_INFO:
            return update(state, {
                myPage: {
                    status: {$set: "WAITING"}
                }
            })
        case MY_PAGE_INFO_SUCCESS:
            return update(state, {
                myPage: {
                    list:{$set:action.data},
                    status: {$set: "SUCCESS"}
                }

            })
        case MY_PAGE_INFO_FAILURE:
            return update(state, {
                myPage: {
                    status: {$set: "FAILURE"}
                },
            })
        case AUTH_SIGNOUT:
            return update(state, {
                signOut: {
                    status: {$set: "WAITING"}
                }
            })
        case AUTH_SIGNOUT_SUCCESS:
            return update(state, {
                signIn: {
                    status: {$set: "INIT"}
                },
                user: {
                    isLoggedIn: {$set: false},
                    email: {$set: ""},
                    nickname: {$set: ""},
                    hash_email: {$set: ""},
                    phone_number: {$set: ""},
                    profile: {$set: ""},
                },
                signOut: {
                    status: {$set: "SUCCESS"}
                }
            })
        case AUTH_SIGNOUT_FAILURE:
            return update(state, {
                signOut: {
                    status: {$set: "FAILURE"}
                }
            })
        default:
            return state;
    }
}

