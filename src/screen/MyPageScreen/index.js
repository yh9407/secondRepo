import React, {useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import styled from 'styled-components';
import {useSelector,useDispatch} from "react-redux";
import {myPageRequest} from "../../action/auth";

const ImageBox = styled.View`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`
const MyPageImage = styled.Image`
margin-top: 30px;
width: 150px;
height: 150px;
border-radius: 100px;
`
const FontStyle = styled.Text`
font-weight: bold;
font-size: 30px;
color: orange;
`
const TotalBox = styled.View`
display: flex;
width: 100%;
align-items: center;
`
const BoxDesign = styled.View`
display: flex;
width: 80%;
margin-top: 40px;
height: 50px;
flex-direction: row;
justify-content: center;
border-bottom-width: 1.5px;
border-bottom-color: lightgray;
`
const BoxText = styled.Text`
font-size: 23px;
color: gray;
`
const DividedBox = styled.View`
display: flex;
width: 50%;
justify-content: center;
align-items: center;
`

const MyPageScreen = ({props}) => {
    const dispatch = useDispatch();

    const signInData = useSelector((state) => state.auth.user)
    const myPageData = useSelector((state) => state.auth.myPage.list)

    const MyPageLoader = () => {
        dispatch(myPageRequest({type:"mobile",...signInData}))
    }

    useEffect(() => {
        MyPageLoader();
    }, [])

    return (
        <ScrollView>
            <View>
                <ImageBox>
                    <MyPageImage source={{
                        uri: signInData.profile
                    }}/>
                    <FontStyle>{signInData.nickname}</FontStyle>
                </ImageBox>
            </View>
            <TotalBox>
                <BoxDesign>
                    <DividedBox>
                        <BoxText>기부 건수</BoxText>
                    </DividedBox>
                    <DividedBox>
                        <BoxText>{myPageData.totalCount} 건</BoxText>
                    </DividedBox>
                </BoxDesign>
                <BoxDesign>
                    <DividedBox>
                        <BoxText>내가 쓴 글</BoxText>
                    </DividedBox>
                    <DividedBox>

                        <BoxText>{myPageData.storyList.length} 건</BoxText>
                    </DividedBox>
                </BoxDesign>
                <BoxDesign>
                    <DividedBox>
                        <BoxText>총 후원 금액</BoxText>
                    </DividedBox>
                    <DividedBox>
                        <BoxText>{myPageData.totalValue} 원 </BoxText>
                    </DividedBox>
                </BoxDesign>
            </TotalBox>
        </ScrollView>
    );
}
export default MyPageScreen;
