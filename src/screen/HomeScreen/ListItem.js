import React, {useEffect, useRef, useState} from "react"
import {View, ScrollView, Dimensions, FlatList, Text, StyleSheet, Animated} from "react-native"
import CampaignList from "./CampaignList";

const {width, height} = Dimensions.get('window')

function infiniteScroll(dataList,mySlide){
let numberOfData = 10

    let scrollValue = 0, scrolled =0
    setInterval(function (){
        scrolled ++
        if(scrolled < numberOfData)
            scrollValue =scrollValue + width
        else {
            scrollValue = 0
            scrolled =0
        }
        if(mySlide.current){
            mySlide.current.scrollToOffset({animated:true,offset:scrollValue});
        }
    },10000)
}
const ListItem = ({data,props}) => {
    const scrollX = new Animated.Value(0)
    const [dataList, setDataList] =useState(data)
    const mySlide = useRef();

    useEffect(()=>{
        setDataList(data)
        infiniteScroll(dataList,mySlide)
    })
    if (data && data.length) {
        return (
            <View>
                <FlatList
                    key={data.id}
                    ref={mySlide}
                    data={data}
                    keyExtractor={(item, index) => "key" + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"normal"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                        return <CampaignList props={props} item={item}/>
                    }}
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{x:scrollX}}}],
                        {useNativeDriver: false}
                    )}
                />
            </View>
        )
    }
    return null
}
export default ListItem;
