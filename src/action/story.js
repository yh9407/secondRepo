import axios from 'axios'

export const STORY_LOAD = "STORY_LIST_LOAD";
export const STORY_LOAD_SUCCESS = "STORY_LIST_LOAD_SUCCESS";
export const STORY_LOAD_FAILURE = "STORY_LIST_LOAD_FAILURE";

export const storyLoadStart = () => {
    return {type: STORY_LOAD}
}
export const storyLoadSuccess = (data) => {
    return {type: STORY_LOAD_SUCCESS, data: data}
}
export const storyLoadFailure = () => {
    return {type: STORY_LOAD_FAILURE}
}

export const storyLoader = (id) => async (dispatch) => {
    dispatch(storyLoadStart());

    await axios
        .get(`http://121.144.131.216:3000/story/${id}`)
        .then((response) => {
            console.log(response.data.data)
            if(response.data.data!==null){
                dispatch(storyLoadSuccess(response.data.data));
            }
        })
        .catch((error) => {
            dispatch(storyLoadFailure());
            console.log(error)
        })
}




