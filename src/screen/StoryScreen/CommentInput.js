import React, {useState} from "react"
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Button
} from "react-native";
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {commentAdd} from "../../action/comment";
import {useSelector} from "react-redux";


const CommentStyle = styled.View`
display: flex;
width: 100%;
margin-bottom: 30px;
flex-direction: column;
align-items: center;
`
const CommentBox = styled.View`
width: 90%;
border-bottom-color: black;
border-bottom-width: 1px;
`
const BtnBox = styled.View`
display: flex;
flex-direction: row-reverse;
width: 97%;
`
const CommentBtn = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 27%;
`
const CommentCancelBth = styled.TouchableOpacity`
width: 50px;
height: 30px;
justify-content: center;
align-items: center;
border-style: solid;
border-color: lightgray;
border-width: 1px;
`
const CommentSubmitBth = styled.TouchableOpacity`
width: 50px;
height: 30px;
justify-content: center;
align-items: center;
border-style: solid;
border-color: #ffa400;
border-width: 1px;
`

const CommentInput = (story_id) => {
    const [comment, setComment] = useState("")
    const dispatch = useDispatch();
    const signInData = useSelector((state) => state.auth.user)
    const handleChange = (text) => {
        setComment(text)
    }
    const submitButton = async () => {
        if (comment === "") {
            alert("댓글을 입력하시기 바랍니다.")
        } else {
            await dispatch(commentAdd({
                type: "mobile", ...signInData, comment, story_id
            }))
            setComment("")
            alert("댓글 등록이 완료되었습니다.")
        }
    }
    const cancelButton = async () => {
        setComment("")
    }

    return (
        <View>
            <CommentStyle>
                <CommentBox>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="따뜻한 말 한마디는 큰 힘이 됩니다"
                        placeholderTextColor="gray"
                        autoCapitalize="none"
                        onChangeText={handleChange}
                        value={comment}
                    >
                    </TextInput>
                </CommentBox>
            </CommentStyle>
            <BtnBox>
            <CommentBtn>

            <View>
                <CommentCancelBth onPress={submitButton}>
                <Text>
                    취소
                </Text>
                </CommentCancelBth>
            </View>
            <View>
                <CommentSubmitBth onPress={submitButton}>
                    <Text>
                        등록
                    </Text>
                </CommentSubmitBth>
            </View>
            </CommentBtn>
            </BtnBox>
        </View>
    )
}
export default CommentInput;
