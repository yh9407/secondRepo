import {combineReducers} from "redux";
import auth from "./auth";
import story from "./story"
import comment from "./comment"
import act from "./act"
import talk from "./talk"
import campaign from "./campaign"

export default combineReducers({
    auth,
    story,
    comment,
    act,
    talk,
    campaign,
})
