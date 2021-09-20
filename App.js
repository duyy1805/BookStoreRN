import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
          Dimensions
} from 'react-native';

import {Ionicons, AntDesign} from "@expo/vector-icons"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Dev_Height = Dimensions.get('window').height
const Dev_width = Dimensions.get('window').width

import Library from './src/Components/Library'
import SearchBar from './src/Components/SearchBar';
import Home from './src/Components/Home';
// import { Searchbar } from 'react-native-paper';

const Tab = createBottomTabNavigator();
export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{headerMode: 'none', headerShown : false,tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={35} />)}} name="Home" component={Home} />
        <Tab.Screen options={{headerMode: 'none', headerShown : false,tabBarIcon: ({ color, size }) => (
          <Ionicons name="library" color={color} size={35} />)}} name="Library" component={Library} />
        <Tab.Screen options={{headerMode: 'none', headerShown : false,tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" color={color} size={35} />)}} name="Search" component={SearchBar} />
        <Tab.Screen options={{headerMode: 'none', headerShown : false,tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={35} />)}} name="Profile" component={SearchBar} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}
