import React, {useEffect, useState} from "react"
import {View, ScrollView, Dimensions, Text, StyleSheet, Image,TouchableOpacity} from "react-native"
import {useDispatch} from "react-redux";
import {campaignDetailLoader} from "../../action/campaign";

const {width, height} = Dimensions.get('window')

const CampaignList = ({props}) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch();


    const getData = () => {
        const url = "http://192.168.0.59:3000/campaign/list/1"
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.list)
            })
    }


    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {data !== [] && data.map((campaign, index) => {
                return <TouchableOpacity
                    onPress={async ()=>{
                        await dispatch(campaignDetailLoader(campaign.id))
                        if(campaign.id){
                            props.navigation.navigate("CampaignDetail")
                        }
                    }}
                    key={index} style={styles.cardView}>
                    <Image style={styles.image}
                           source={{
                               uri: campaign.Campaign_Files[0].file
                           }}/>
                    <View style={styles.textView}>
                        <Text style={styles.itemTitle}>
                            {campaign.campaign_title}
                        </Text>
                        <Text style={styles.itemDescription}>
                            {campaign.campaign_value} / {campaign.campaign_goal}
                        </Text>
                    </View>
                </TouchableOpacity>
            })}
        </>
    )
}
const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    textView: {
        position: "absolute",
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: width - 20,
        height: height / 3,
        borderRadius: 10,
    },
    itemTitle: {
        color: "white",
        fontSize: 22,
        shadowColor: "#000",
        shadowOffset: {width: 0.8, height: 0.8},
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: "white",
        fontSize: 12,
        shadowColor: "#000",
        shadowOffset: {width: 0.8, height: 0.8},
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})
export default CampaignList;
