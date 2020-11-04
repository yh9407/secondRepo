import
{
    COMMENT_ADD,
    COMMENT_ADD_SUCCESS,
    COMMENT_ADD_FAILURE
} from '../action/comment'

import update from "react-addons-update"

const initialState = {
   comment:{
       status: "INIT"
   }
}
export default function auth(state = initialState, action) {
    switch (action.type) {
        case COMMENT_ADD:
            return update(state, {
                comment: {
                    status: {$set: "WAITING"}
                }
            })
        case COMMENT_ADD_SUCCESS:
            return update(state, {
              comment: {
                  status: {$set: "SUCCESS"}
              }
            })
        case COMMENT_ADD_FAILURE:
            return update(state, {
                comment: {
                    status: {$set: "FAILURE"}
                },
            })
        default:
            return state;
    }
}

