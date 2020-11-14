import * as React from 'react';
import HomeScreen from "./screen/HomeScreen";
import SettingScreen from "./screen/SettingScreen";
import StoryScreen from "./screen/StoryScreen";
import MyPageScreen from "./screen/MyPageScreen";
import SignIn from "./screen/SignUpScreen/signin";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import FlatListPractice from "./screen/StoryScreen/flatListPractice"
import styled from 'styled-components';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text,Image} from 'react-native';
import {useSelector} from "react-redux";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import StoryDetail from "./screen/StoryScreen/StoryDetail";
import Exam from "./screen/StoryScreen/Exam";
import ActList from "./screen/ActScreen/ActList";
import ActDetail from "./screen/ActScreen/ActDetail";
import TalkList from "./screen/TalkScreen/TalkList";
import TalkDetail from "./screen/TalkScreen/TalkDetail";
import SignUp from "./screen/SignUpScreen/signup";
import CampaignDetail from "./screen/HomeScreen/CampaignDetail";
import CampaignList from "./screen/HomeScreen/CampaignList";
import ListItem from "./screen/HomeScreen/ListItem";
import CommentLoader from "./screen/StoryScreen/CommentLoader";
import TalkCommentLoader from "./screen/TalkScreen/TalkCommentLoader";
import Images from "../public/pictures";
import MyStory from "./screen/MyPageScreen/MyStory";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const NavTitleBox = styled.View`
display: flex;
width: 100%;
`
const NavTitleText = styled.Text`
font-size: 24px;
font-style: italic;
margin-left: 10px;
color: #febb6c;
`
const DetailNavText = styled.Text`
font-size: 20px;
font-style: italic;
color: black;
`


function CustomDrawerContent(props) {
    const signInData = useSelector((state) => state.auth.user)
    return (
        <DrawerContentScrollView {...props}>
            {signInData.isLoggedIn ? <View>
                <Image source={{
                    uri: signInData.profile
                }}/>
                <Text> {signInData.nickname}</Text>
                <Text> {signInData.email}</Text>
                <Text> {signInData.phone_number}</Text>
            </View> : null}

            <View>

            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

function DrawerData(props) {
    const signInData = useSelector((state) => state.auth.user)
    return (
        <View>
            <Text>이메일 : {signInData.email}</Text>
            <Text>닉네임 : {signInData.nickname}</Text>
            <Text>휴대전화 : {signInData.phone_number}</Text>
        </View>
    )
}

function DrawerNav(props) {
    const signInData = useSelector((state) => state.auth.user)

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Close" component={BottomTabNav}/>

            {signInData.isLoggedIn ? null : <Drawer.Screen name="SignIn" component={SignIn}/>}

        </Drawer.Navigator>
    )
}

function BottomTabNav(props) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000000"
            inactiveColor="#e24656"
            barStyle={{backgroundColor: '#fee3c6'}}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="home" color={color} size={26}/>
                            ),
                        }}/>
            <Tab.Screen name="Setting" component={SettingScreen}
                        options={{
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="cog" color={color} size={26}/>
                            ),
                        }}/>
            <Tab.Screen name="Story" component={StoryScreen} options={{
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="heart-multiple" color={color} size={26}/>
                ),
                tabBarBadge: 3
            }
            }/>
            <Tab.Screen name="My" component={MyPageScreen}
                        options={{
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="account" color={color} size={26}/>
                            ),
                        }}/>
        </Tab.Navigator>
    )
}

function AppStack(props) {
    const StoryDetailData = useSelector((state) => state.story.story.data)
    const signInData = useSelector((state) => state.auth.user)
    const ActDetailData = useSelector((state) => state.act.act.data)
    const TalkDetailData = useSelector((state) => state.talk.talk.data)

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                    }}>
                    {signInData.isLoggedIn ? <Stack.Screen name="HUG US" component={DrawerNav}
                                                           options={{
                                                               headerTitle: (props) => (
                                                                   <NavTitleBox>
                                                                       <NavTitleText>
                                                                           Hugus
                                                                       </NavTitleText>
                                                                   </NavTitleBox>
                                                               )
                                                           }}
                        />
                        : <Stack.Screen name="SignIn" component={SignIn}
                                        options={{
                                            headerTitle: (props) => (
                                                <NavTitleBox>
                                                    <NavTitleText>
                                                        로그인
                                                    </NavTitleText>
                                                </NavTitleBox>
                                            )
                                        }}/>}
                    <Stack.Screen name="Home" component={BottomTabNav} options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <NavTitleText>
                                    Hugus
                                </NavTitleText>
                            </NavTitleBox>
                        )
                    }}/>
                    <Stack.Screen name="SignUp" component={SignUp} options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <NavTitleText>
                                    회원가입
                                </NavTitleText>

                            </NavTitleBox>
                        )
                    }}/>
                    <Stack.Screen name="StoryDetail" component={StoryDetail}  options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <DetailNavText>
                                    {StoryDetailData.story_title}
                                </DetailNavText>
                            </NavTitleBox>
                        )
                    }}/>

                    <Stack.Screen name="Exam" component={Exam} options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <NavTitleText>
                                    Hugus Story
                                </NavTitleText>
                            </NavTitleBox>
                        )
                    }}/>
                    <Stack.Screen name="ActList" component={ActList} options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <NavTitleText>
                                    Hugus Act
                                </NavTitleText>
                            </NavTitleBox>
                        )
                    }}/>
                    <Stack.Screen name="ActDetail" component={ActDetail} options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <DetailNavText>
                                    ' {ActDetailData.act_title} '의 소식입니다.
                                </DetailNavText>
                            </NavTitleBox>
                        )
                    }}/>
                    <Stack.Screen name="TalkList" component={TalkList} options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <NavTitleText>
                                    Hugus Talk
                                </NavTitleText>
                            </NavTitleBox>
                        )
                    }}/>
                    <Stack.Screen name="TalkDetail" component={TalkDetail} options={{
                        headerTitle: (props) => (
                            <NavTitleBox>
                                <DetailNavText>
                                    {TalkDetailData.talk_title}
                                </DetailNavText>
                            </NavTitleBox>
                        )
                    }}/>
                    <Stack.Screen name="CampaignDetail" component={CampaignDetail} options={{
                        title: ""
                    }}/>
                    <Stack.Screen name="CampaignList" component={CampaignList} options={{
                        title: ""
                    }}/>
                    <Stack.Screen name="ListItem" component={ListItem} options={{
                        title: ""
                    }}/>
                    <Stack.Screen name="CommentLoader" component={CommentLoader} options={{
                        title: ""
                    }}/>
                    <Stack.Screen name="TalkCommentLoader" component={TalkCommentLoader} options={{
                        title: ""
                    }}/>
                    <Stack.Screen name="MyStory" component={MyStory} options={{
                        title: ""
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}

export default AppStack;
