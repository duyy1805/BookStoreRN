import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions } from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Dev_Height = Dimensions.get("window").height;
const Dev_width = Dimensions.get("window").width;
// hello world
import Library from "./Components/Library";
import SearchBar from "./Components/SearchBar";
import Home from "./Components/Home";
import Params from "./API/Params";
// import { Searchbar } from 'react-native-paper';
const Tab = createBottomTabNavigator();
export default function TabNavigation({ route, navigation }) {
    const { token } = route.params;

    return (
        <Params.Provider value={token}>
            <Tab.Navigator>
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
                />
            </Tab.Navigator>
        </Params.Provider>
    );
}
