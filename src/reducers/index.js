import {combineReducers} from "redux";
import auth from "./auth";
import story from "./story"
import comment from "./comment"

export default combineReducers({
    auth,
    story,
    comment,
})
