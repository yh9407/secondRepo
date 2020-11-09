import * as React from 'react';
import HomeScreen from "./screen/HomeScreen";
import SettingScreen from "./screen/SettingScreen";
import StoryScreen from "./screen/StoryScreen";
import MyPageScreen from "./screen/MyPageScreen";
import SignIn from "./screen/SignUpScreen/signin";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import FlatListPractice from "./screen/StoryScreen/flatListPractice"
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text} from 'react-native';
import {useSelector} from "react-redux";
import {Image} from "react-native-paper/src/components/Avatar/Avatar";
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

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();


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

function DrawerData() {
    const signInData = useSelector((state) => state.auth.user)
    return (
        <View>
            <Text>이메일 : {signInData.email}</Text>
            <Text>닉네임 : {signInData.nickname}</Text>
            <Text>휴대전화 : {signInData.phone_number}</Text>
        </View>
    )
}

function DrawerNav() {
    const signInData = useSelector((state) => state.auth.user)

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Close" component={BottomTabNav}/>

            {signInData.isLoggedIn ? null : <Drawer.Screen name="SignIn" component={SignIn}/>}

        </Drawer.Navigator>
    )
}

function BottomTabNav() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000000"
            inactiveColor="#e24656"
            barStyle={{backgroundColor: '#f7c231'}}
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

function AppStack() {
    const signInData = useSelector((state) => state.auth.user)
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    {signInData.isLoggedIn ? <Stack.Screen name="HUG US" component={DrawerNav}/>
                        : <Stack.Screen name="SignIn" component={SignIn}
                                        options={{title: "로그인화면"}}/>}
                    <Stack.Screen name="Home" component={BottomTabNav}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                    {/*<Stack.Screen name="Story" component={StoryScreen}/>*/}
                    <Stack.Screen name="StoryDetail" component={StoryDetail}/>
                    <Stack.Screen name="FlatListPractice" component={FlatListPractice}/>
                    <Stack.Screen name="Exam" component={Exam}/>
                    <Stack.Screen name="ActList" component={ActList}/>
                    <Stack.Screen name="ActDetail" component={ActDetail}/>
                    <Stack.Screen name="TalkList" component={TalkList}/>
                    <Stack.Screen name="TalkDetail" component={TalkDetail}/>
                    <Stack.Screen name="CampaignDetail" component={CampaignDetail}/>
                    <Stack.Screen name="CampaignList" component={CampaignList}/>
                    <Stack.Screen name="ListItem" component={ListItem}/>

                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}

export default AppStack;
