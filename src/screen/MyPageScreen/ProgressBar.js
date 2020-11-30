import React, {useEffect, useRef} from "react"
import {useSelector, useDispatch} from "react-redux";
import styled from 'styled-components';
import {Animated} from "react-native";

const BarStyle = styled.View`
width: 100%;
height: 20px;
display: flex;
flex-direction: row;
`
const Bar = styled.View`
display: flex;
background-color: #e7e7e7;
border-radius: 10px;
width: 65%;
height: 25px;
margin-top: 30px;
margin-left: 13px;
`
const BarIn = styled.View`
align-items: center;
justify-content: center;
background-color: orange;
border-radius: 10px;
height: 25px;
${(props) => (props.ratio == 0 ? "width:0px" : `width:${props.ratio}%`)};
`
const BarTextBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 17%;
margin-top: 44px;
`
const BarText = styled.Text`
font-size: 15px;
color: gray;
`

const ProgressBar = ({story_vote, story_goal}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    let ratio = ((story_vote / story_goal) * 100).toFixed(0);
    if (ratio > 100) ratio = 100;
    return (
        <>
            <BarStyle>
                <Bar>
                    <BarIn ratio={ratio}>
                        <Animated.Text
                            style={{
                                opacity: fadeAnim,
                            }}>
                            {ratio}%
                        </Animated.Text>
                    </BarIn>
                </Bar>
            </BarStyle>
            <BarTextBox>
                <BarText>
                    {(story_vote/story_goal*100).toFixed(0)}%
                </BarText>
            </BarTextBox>
        </>
    )

}

export default ProgressBar;