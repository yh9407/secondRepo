import React, {useEffect, useRef, useState} from "react"
import {View, ScrollView, Dimensions, FlatList, Text, StyleSheet, Animated} from "react-native"
import CampaignList from "./CampaignList";

const {width, height} = Dimensions.get('window')

function infiniteScroll(dataList,mySlide){
let numberOfData = 5

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
    },3000)
}
const ListItem = ({data}) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
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
                    ref={mySlide}
                    data={data}
                    keyExtractor={(item, index) => "key" + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                        return <CampaignList item={item}/>
                    }}
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{x:scrollX}}}],
                        {useNativeDriver: false}
                    )}
                />
                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{
                                    opacity,
                                    height: 10,
                                    width: 10,
                                    background: "#595959",
                                    margin: 8,
                                    borderRadius: 5
                                }}/>
                        )
                    })}

                </View>

            </View>
        )
    }
    return null
}
const styles=StyleSheet.create({
    dotView:{
        flexDirection:"row",
        justifyContent:"center",
    }
})
export default ListItem;