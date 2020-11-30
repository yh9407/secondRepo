import
{
    CAMPAIGN_DETAIL_LOAD,
    CAMPAIGN_DETAIL_SUCCESS,
    CAMPAIGN_DETAIL_FAILURE,
} from "../action/campaign"

import update from "react-addons-update"

const initialState ={
    campaign: {
        status:"INIT",
        data: {},
    }
}

export default function campaign(state=initialState, action) {
    switch (action.type) {
        case CAMPAIGN_DETAIL_LOAD:
            return update(state, {
                campaign:{
                    status:{$set: "WAITING"}
                }
            });
        case CAMPAIGN_DETAIL_SUCCESS:
            return update(state, {
                campaign:{
                    data:{$set:action.data},
                    status:{$set: "SUCCESS"}
                }
            });
        case CAMPAIGN_DETAIL_FAILURE:
            return update(state, {
                campaign:{
                    status:{$set: "FAILURE"}
                }
            });
        default:
            return state;
    }
}
