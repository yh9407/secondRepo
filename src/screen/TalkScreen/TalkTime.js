import React, {useEffect, useState} from "react"
import {View, Text} from "react-native"

const TimeSet = ({At}) => {
    const [sec, setSec] = useState(0);
    const timeSet = (value) => {

        const time = ((value).replace(/-/gi, "/"))
        const now = new Date();
        const timeValue = new Date(time);

        let secondTime = Math.floor(now.getTime()+(540 * 60 * 1000) - timeValue.getTime()) / 1000;

        const betweenTime = Math.floor(
            (now.getTime()+(540 * 60 * 1000) - timeValue.getTime()) / 1000 / 60
        );
        if (secondTime < 60) return `방금전`
        if (betweenTime < 60) {
            const gap = () => {
                if (secondTime - betweenTime * 60 < 10) {
                    return "0" + Math.floor(secondTime - betweenTime * 60);
                } else return Math.floor(secondTime - betweenTime * 60);
            };
            return `${betweenTime}분전`
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`
        }
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`
        }
        return `${Math.floor(betweenTimeDay / 365).toString()}년전`
    }
    useEffect(() => {
        const i = setInterval(() => setSec(sec + 1), 60000);
        return () => clearInterval(i);
    }, [sec])
    return (
        <View>
            <Text>
                {timeSet(At)}
            </Text>
        </View>
    )
}
export default TimeSet;
