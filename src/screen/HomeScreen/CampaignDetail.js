import React, {useEffect, useState} from "react"
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity, Dimensions,
    Text,
} from 'react-native';
import FullWidthPicture from "./FullWidthPicture"

const {width, height} = Dimensions.get('window')

import {useDispatch, useSelector} from "react-redux";

const CampaignDetail = () => {
    const DetailData = useSelector((state) => state.campaign.campaign.data)

    return (
        <ScrollView style={{flex: 1}}>
            {DetailData && DetailData ?
                <FullWidthPicture uri={DetailData.Campaign_Files[1].file}/>
                : null}
        </ScrollView>
    )
}
export default CampaignDetail
