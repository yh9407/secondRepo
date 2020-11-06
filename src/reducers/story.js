import
{
    STORY_LOAD,
    STORY_LOAD_SUCCESS,
    STORY_LOAD_FAILURE,
    STORY_COMMENT_LOAD,
    STORY_COMMENT_LOAD_SUCCESS,
    STORY_COMMENT_LOAD_FAILURE,
    ALL_STORY_LOAD,
    ALL_STORY_LOAD_SUCCESS,
    ALL_STORY_LOAD_FAILURE,
    STORY_VOTE,
    STORY_VOTE_SUCCESS,
    STORY_VOTE_FAILURE,
} from '../action/story'

import update from "react-addons-update"

const initialState = {
    story: {
        status: "INIT",
        data: [],
    },
    allStory: {
        status: "INIT",
        data: [],
    },
    comment: {
        status: "INIT",
        list: [],
    },
    vote: {
        user: false,
        status: "INIT",
        voteNum: 0,
    },
}
export default function story(state = initialState, action) {
    switch (action.type) {
        case ALL_STORY_LOAD:
            return update(state, {
                allStory: {
                    status: {$set: "WAITING"}
                }
            })
        case ALL_STORY_LOAD_SUCCESS:
            return update(state, {
                allStory: {
                    status: {$set: "SUCCESS"},
                    data: {$set: action.data},
                }
            })
        case ALL_STORY_LOAD_FAILURE:
            return update(state, {
                allStory: {
                    status: {$set: "FAILURE"}
                }
            })
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
                    data: {$set: action.data},
                }
            })
        case STORY_LOAD_FAILURE:
            return update(state, {
                story: {
                    status: {$set: "FAILURE"}
                }
            })
        case STORY_COMMENT_LOAD:
            return update(state, {
                comment: {
                    status: {$set: "WAITING"}
                }
            })
        case STORY_COMMENT_LOAD_SUCCESS:
            return update(state, {
                comment: {
                    status: {$set: "SUCCESS"},
                    list: {$set: action.list},
                }
            })
        case STORY_COMMENT_LOAD_FAILURE:
            return update(state, {
                comment: {
                    status: {$set: "FAILURE"}
                }
            })
        case STORY_VOTE:
            return update(state, {
                vote: {
                    status: {$set: "WAITING"}
                }
            });
        case STORY_VOTE_SUCCESS:
            let voteNum;
            if (state.vote.user) voteNum = state.vote.voteNum - 1;
            else voteNum = state.vote.voteNum + 1;
            return update(state, {
                vote: {
                    status: {$set: "SUCCESS"},
                    user: {$set: !state.vote.user},
                    voteNum: {$set: voteNum},
                }
            });
        case STORY_VOTE_FAILURE:
            return update(state, {
                vote: {
                    status: {$set: "FAILURE"}
                }
            });
        default:
            return state;
    }
}

