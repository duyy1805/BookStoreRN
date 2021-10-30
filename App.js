import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
// import { Searchbar } from 'react-native-paper';
import TabNavigation from "./src/TabNavigation";
import SignUp from "./src/Components/SignUp2";
// import LoginScreen from "./src/Components/Login";
// import LogOut from "./src/Components/LogOut";
import StartScreen from "./src/Components/StartScreen";
import LoginScreen from "./src/Components/Login2";
// import AlertView from "./src/Components/component/AlertView";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();
const App = () => {
    const [isLoggedIn, setLogged] = useState(null);
    const detectLogin = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    };
    useEffect(() => {
        detectLogin();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="StartScreen"
                    component={StartScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
