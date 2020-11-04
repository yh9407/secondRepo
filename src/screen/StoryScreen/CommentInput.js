import React, {useState} from "react"
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Button
} from "react-native";
import {useDispatch} from "react-redux";
import {commentAdd} from "../../action/comment";
import {useSelector} from "react-redux";

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
            <TextInput
                underlineColorAndroid="transparent"
                placeholder="댓글을 입력 해 주세요"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handleChange}
                value={comment}
            >
            </TextInput>
            <View>
                <Button onPress={submitButton} title="댓글 작성하기"/>
            </View>
            <View>
                <Button onPress={cancelButton} title="취소하기"/>
            </View>
        </View>
    )
}
export default CommentInput;
