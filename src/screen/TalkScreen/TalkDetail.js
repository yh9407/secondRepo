import React from "react"
import {
    View,
    Button,
    Text,
} from 'react-native';
import {useSelector} from "react-redux";


const TalkDetail = () => {
    const DetailData = useSelector((state) => state.talk.talk.data)
    return (
        <View>
            <Text>
                제목 : {DetailData.talk_title}
            </Text>
            <Text>
                내용 : {DetailData.talk_content}
            </Text>
            <Text>
                조회수 : {DetailData.visited}
            </Text>
        </View>
    )
}
export default TalkDetail;