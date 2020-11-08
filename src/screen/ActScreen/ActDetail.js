import React from "react"
import {
    View,
    Button,
    Text,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";


const ActDetail = () => {
    const DetailData = useSelector((state) => state.act.act.data)
    return (
        <View>
            <Text>
                제목 : {DetailData.act_title}
            </Text>
            <Text>
                내용 : {DetailData.act_content}
            </Text>
            <Text>
                조회수 : {DetailData.visited}
            </Text>
        </View>

    )
}
export default ActDetail;