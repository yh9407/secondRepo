import
{
    ACT_DETAIL_LOAD,
    ACT_DETAIL_SUCCESS,
    ACT_DETAIL_FAILURE,
} from "../action/act"
import update from "react-addons-update"

const initialState ={
    act: {
        status:"INIT",
        data: {},
    }
}
export default function act(state=initialState, action) {
    switch (action.type) {
        case ACT_DETAIL_LOAD:
            return update(state, {
                act:{
                    status:{$set: "WAITING"}
                }
            });
        case ACT_DETAIL_SUCCESS:
            return update(state, {
                act:{
                    data:{$set:action.data},
                    status:{$set: "SUCCESS"}
                }
            });
        case ACT_DETAIL_FAILURE:
            return update(state, {
                act:{
                    status:{$set: "FAILURE"}
                }
            });
        default:
            return state;
    }
}