import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, Animated } from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRef } from "react";
const Dev_Height = Dimensions.get("window").height;
const Dev_width = Dimensions.get("window").width;
const width = Dev_width / 4;
// hello world
import Library from "./Components/Library";
import SearchBar from "./Components/SearchBar";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Params from "./API/Params";
import { MyContext } from "./Components/Context";
// import { Searchbar } from 'react-native-paper';
const Tab = createBottomTabNavigator();
export default function TabNavigation({ route, navigation }) {
    const { token, username } = route.params;
    const tabOffsetValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (token != "") {
            navigation.setOptions({ gestureEnabled: false });
        }
    }, []);
    return (
        <MyContext.Provider value={{ token, username }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#f0d7f4" },
                }}
            >
                <Tab.Screen
                    options={{
                        headerMode: "none",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={35} />
                        ),
                    }}
                    name="Trang chủ"
                    component={Home}
                    listeners={({ navigation, route }) => ({
                        // Onpress Update....
                        tabPress: (e) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: 0,
                                useNativeDriver: true,
                            }).start();
                        },
                    })}
                />
                <Tab.Screen
                    options={{
                        headerMode: "none",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="library" color={color} size={35} />
                        ),
                    }}
                    name="Thư viện"
                    component={Library}
                    listeners={({ navigation, route }) => ({
                        // Onpress Update....
                        tabPress: (e) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: width,
                                useNativeDriver: true,
                            }).start();
                        },
                    })}
                    // inititalParamas={{ username: username }}
                />
                <Tab.Screen
                    options={{
                        headerMode: "none",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search" color={color} size={35} />
                        ),
                    }}
                    name="Tìm kiếm"
                    component={SearchBar}
                    listeners={({ navigation, route }) => ({
                        // Onpress Update....
                        tabPress: (e) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: width * 2,
                                useNativeDriver: true,
                            }).start();
                        },
                    })}
                />
                <Tab.Screen
                    options={{
                        headerMode: "none",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" color={color} size={35} />
                        ),
                    }}
                    name="Cá nhân"
                    component={Profile}
                    listeners={({ navigation, route }) => ({
                        // Onpress Update....
                        tabPress: (e) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: width * 3,
                                useNativeDriver: true,
                            }).start();
                        },
                    })}
                />
            </Tab.Navigator>
            <Animated.View
                style={{
                    width: Dev_width / 4,
                    height: 2,
                    backgroundColor: "#590CE4",
                    position: "absolute",
                    bottom: 80,
                    // Horizontal Padding = 20...
                    // left: 50,
                    borderRadius: 20,
                    transform: [{ translateX: tabOffsetValue }],
                }}
            ></Animated.View>
        </MyContext.Provider>
    );
}
