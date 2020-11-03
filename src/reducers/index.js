import {combineReducers} from "redux";
import auth from "./auth";
import story from "./story"

export default combineReducers({
    auth,
    story
})
