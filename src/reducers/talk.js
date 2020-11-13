import
{
    TALK_DETAIL_LOAD,
    TALK_DETAIL_SUCCESS,
    TALK_DETAIL_FAILURE,
    TALK_COMMENT_ADD,
    TALK_COMMENT_ADD_SUCCESS,
    TALK_COMMENT_ADD_FAILURE,
    TALK_LIKE,
    TALK_LIKE_SUCCESS,
    TALK_LIKE_FAILURE,
} from "../action/talk"
import update from "react-addons-update"

const initialState ={
    talk: {
        status:"INIT",
        data: {},
    },
    comment:{
        status:"INIT",
    },
    like: {
        user: false,
        status: "INIT",
        likeNum:0,
    }
}
export default function talk(state=initialState, action) {
    switch (action.type) {
        case TALK_DETAIL_LOAD:
            return update(state, {
                talk:{
                    status:{$set: "WAITING"}
                }
            });
        case TALK_DETAIL_SUCCESS:
            return update(state, {
                talk:{
                    data:{$set:action.data},
                    status:{$set: "SUCCESS"}
                }
            });
        case TALK_DETAIL_FAILURE:
            return update(state, {
                talk:{
                    status:{$set: "FAILURE"}
                }
            });
        case TALK_COMMENT_ADD:
            return update(state, {
                comment:{
                    status:{$set: "WAITING"}
                }
            });
        case TALK_COMMENT_ADD_SUCCESS:
            return update(state, {
                comment:{
                    status:{$set: "SUCCESS"}
                }
            });
        case TALK_COMMENT_ADD_FAILURE:
            return update(state, {
                comment:{
                    status:{$set: "FAILURE"}
                }
            });
        case TALK_LIKE:
            return update(state, {
                like: {
                    status: {$set: "WAITING"}
                }
            });
        case TALK_LIKE_SUCCESS:
            let num;
            if (state.like.user) num = state.like.likeNum - 1;
            else num = state.like.likeNum + 1;
            return update(state, {
                like: {
                    status: {$set: "SUCCESS"},
                    user: {$set: !state.like.user},
                    likeNum: {$set: num},
                }
            });
        case TALK_LIKE_FAILURE:
            return update(state, {
                like: {
                    status: {$set: "FAILURE"}
                }
            });
        default:
            return state;
    }
}
