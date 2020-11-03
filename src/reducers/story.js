import
{
    STORY_LOAD,
    STORY_LOAD_SUCCESS,
    STORY_LOAD_FAILURE
} from '../action/story'

import update from "react-addons-update"

const initialState = {
    story: {
        status: "INIT",
        data:[]
    },
}
export default function story(state = initialState, action) {
    switch (action.type) {
        case STORY_LOAD:
            return update(state, {
                story: {
                    status: {$set: "WAITING"}
                }
            })
        case STORY_LOAD_SUCCESS:
            return update(state, {
                story: {
                    status: {$set: "SUCCESS"},
                    data:{$set:action.data}
                }
            })
        case STORY_LOAD_FAILURE:
            return update(state, {
                story: {
                    status: {$set: "FAILURE"}
                }
            })
        default:
            return state;
    }
}

