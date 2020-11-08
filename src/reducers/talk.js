import
{
    TALK_DETAIL_LOAD,
    TALK_DETAIL_SUCCESS,
    TALK_DETAIL_FAILURE,
} from "../action/talk"
import update from "react-addons-update"

const initialState ={
    talk: {
        status:"INIT",
        data: {},
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
        default:
            return state;
    }
}