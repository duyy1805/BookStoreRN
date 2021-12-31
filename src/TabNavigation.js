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
import Params from "./API/Params";
// import { Searchbar } from 'react-native-paper';
const Tab = createBottomTabNavigator();
export default function TabNavigation({ route, navigation }) {
    const { token } = route.params;
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener("beforeRemove", (e) => {
    //         e.preventDefault();
    //     });

    //     return unsubscribe;
    // }, [navigation]);
    // React.useEffect(() =>
    //     navigation.addListener("beforeRemove", (e) => {
    //         if (token != "") {
    //             e.preventDefault();
    //         }
    //     })
    // );
    useEffect(() => {
        if (token != "") {
            navigation.setOptions({ gestureEnabled: false });
        }
    }, []);
    return (
        <Params.Provider value={token}>
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
                    name="Home"
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
                    name="Library"
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
                />
                <Tab.Screen
                    options={{
                        headerMode: "none",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search" color={color} size={35} />
                        ),
                    }}
                    name="Search"
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
                    name="Profile"
                    component={Library}
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
                    backgroundColor: "red",
                    position: "absolute",
                    bottom: 80,
                    // Horizontal Padding = 20...
                    // left: 50,
                    borderRadius: 20,
                    transform: [{ translateX: tabOffsetValue }],
                }}
            ></Animated.View>
        </Params.Provider>
    );
}
