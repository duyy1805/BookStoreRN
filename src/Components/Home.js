import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Button,
    FlatList,
    Image,
    ImageBackground,
    NativeModules,
    Animated,
    ScrollView,
} from "react-native";
import { LogBox } from "react-native";
import { WebView } from "react-native-webview";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import api from "../API/api.js";
import B from "./BookDetail";
import Library from "./Library";
import Background from "./component/Background";

import { ProgressBar, Colors, Searchbar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

const Dev_Height = Dimensions.get("window").height;
const Dev_width = Dimensions.get("window").width;

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            time: "",
        };
        this.scrollY = new Animated.Value(0);
    }

    getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes + ':' + seconds;
    }

    getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) {
            return "Good Morning";
        }
        if (hours >= 12 && hours <= 17) {
            return "Good Afternoon";
        }
        return "Good Evening";
    };

    componentDidMount() {
        const getItem = () => {
            fetch(api.url1 + "/api/book/show")
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    this.setState({
                        items: data,
                    });
                });
        };
        getItem();
        this.state.time = this.getCurrentTime();
    }

    _render_item = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate("BookDetail", { book: item })
                }
            >
                <ImageBackground
                    source={{ uri: item.image }}
                    imageStyle={{ borderRadius: 25 }}
                    style={[
                        styles.shadow,
                        {
                            height: "97%",
                            width: 140,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.shadowText,
                            {
                                marginTop: "100%",
                                color: "#FFF",
                                fontSize: 15,
                                marginLeft: 10,
                                fontWeight: "bold",
                            },
                        ]}
                    >
                        {item.title1}
                    </Text>
                    <Text
                        style={[
                            styles.shadowText,
                            { color: "#FFF", fontSize: 14, marginLeft: 10 },
                        ]}
                    >
                        {item.author}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    _render_item2 = ({ item, index }) => {
        const scale = this.scrollY.interpolate({
            inputRange: [-1, 0, 120 * index, 120 * (index + 2)],
            outputRange: [1, 1, 1, -2],
        });
        return (
            <Animated.View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    transform: [{ scale }],
                }}
            >
                <View
                    style={{ height: "100%", width: "20%", marginLeft: "7%" }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("BookDetail", {
                                book: item,
                            })
                        }
                    >
                        <ImageBackground
                            source={{ uri: item.image }}
                            imageStyle={{ borderRadius: 15 }}
                            style={[
                                styles.shadow,
                                { height: 100, width: "100%" },
                            ]}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ width: 250 }}>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.shadow,
                                {
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginLeft: "10%",
                                    marginTop: "5%",
                                },
                            ]}
                        >
                            {item.title1}
                        </Text>
                        <Text style={{ marginLeft: "10%", marginTop: "5%" }}>
                            {item.author}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <ProgressBar
                                style={{
                                    height: 3,
                                    width: 100,
                                    marginLeft: "15%",
                                    marginTop: "8%",
                                }}
                                progress={(0.73 * item.rating) / 5}
                            />
                            <Text style={{ marginRight: " 5%" }}>
                                {item.rating}
                            </Text>
                            <Ionicons
                                name="star"
                                size={20}
                                color="#ffc107"
                                style={{ bottom: 5 }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            bottom: -2,
                            height: 1,
                            backgroundColor: "#e6e4eb",
                            width: 230,
                            marginLeft: 6,
                            position: "absolute",
                        }}
                    />
                </View>
            </Animated.View>
        );
    };

    render() {
        var ran = JSON.parse(JSON.stringify(this.state.items));
        ran.sort(() => Math.random() - 0.5);
        var ran2 = JSON.parse(JSON.stringify(ran));
        ran2.sort(() => Math.random() - 0.5);
        return (
            <>
                <ImageBackground
                    source={{
                        uri: "https://kenh14cdn.com/2020/9/25/hinh-nen-iphone-11-1600990116056809485952.jpg",
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: "rgba(240,240,232,0.3)",
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    {/* <SafeAreaView style={{ flex: 0, backgroundColor: "" }} /> */}
                    <SafeAreaView
                        style={{
                            height: Dev_Height,
                            width: Dev_width,
                        }}
                    >
                        <View
                            style={{
                                height: "7%",
                                width: "100%",
                                backgroundColor: "",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingTop: "5%",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* <TouchableOpacity style={{ marginLeft: "6%" }}>
            <Ionicons name="ios-menu" size={32} color="#7FA1F8" />
          </TouchableOpacity> */}
                            <Text
                                style={{
                                    marginLeft: "6%",
                                    fontSize: 30,
                                    fontWeight: "bold",
                                    color: "#560CCE",
                                }}
                            >
                                {this.getGreeting()}
                            </Text>
                            {/* <TouchableOpacity style={{ marginRight: "7%" }} onPress={() => this.props.navigation.popToTop()}>
                                <Ionicons
                                    name="person-circle-outline"
                                    size={40}
                                    color="#7FA1F8"
                                />
                            </TouchableOpacity> */}
                            <Text
                                style={{
                                    marginRight: "6%",
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    color: "#560CCE",
                                }}>
                                {/* {this.state.time} */}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: 5,
                                height: 1,
                                backgroundColor: "#e6e4eb",
                                width: Dev_width - 32,
                                marginLeft: 16,
                            }}
                        />
                        <ScrollView style={{ height: "10%" }}>
                            <View style={{ height: "5%", width: "100%" }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        marginLeft: "6%",
                                        marginTop: "2%",
                                        color: "#0071e3",
                                    }}
                                >

                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginLeft: "6%",
                                        marginTop: "2%",
                                    }}
                                >
                                    Sách nổi bật
                                </Text>
                            </View>

                            <View>
                                <FlatList
                                    data={ran}
                                    renderItem={this._render_item}
                                    keyExtractor={(item) => item._id.toString()}
                                    horizontal={true}
                                    style={{
                                        marginLeft: "7%",
                                        marginTop: "2%",
                                        height: 250,
                                        width: "93%",
                                    }}
                                    ItemSeparatorComponent={() => (
                                        <View
                                            style={{ width: 30, height: "30%" }}
                                        />
                                    )}
                                />
                            </View>

                            <View style={{ height: "3%", width: "100%" }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginLeft: "6%",
                                        marginTop: "2%",
                                    }}
                                >
                                    Tiểu thuyết
                                </Text>
                            </View>

                            <View>
                                <FlatList
                                    data={ran2}
                                    renderItem={this._render_item}
                                    keyExtractor={(item) => item._id.toString()}
                                    horizontal={true}
                                    style={{
                                        marginLeft: "7%",
                                        marginTop: "2%",
                                        height: 250,
                                        width: "93%",
                                    }}
                                    ItemSeparatorComponent={() => (
                                        <View
                                            style={{ width: 30, height: "30%" }}
                                        />
                                    )}
                                />
                            </View>

                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    marginLeft: "6%",
                                    marginTop: "2%",
                                }}
                            >
                                Được tìm kiếm nhiều nhất
                            </Text>
                            {/* <View> */}
                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: "row",
                                    width: "100%",
                                    marginBottom: "31%"
                                }}
                            >
                                <Animated.FlatList
                                    data={this.state.items}
                                    renderItem={this._render_item2}
                                    keyExtractor={(item) => `key-${item._id}`}
                                    style={{
                                        marginLeft: "7%",
                                        height: 775, //275
                                        width: "100%",
                                    }}
                                    ItemSeparatorComponent={() => (
                                        <View
                                            style={{ width: "30%", height: 20 }}
                                        />
                                    )}
                                    onScroll={Animated.event(
                                        [
                                            {
                                                nativeEvent: {
                                                    contentOffset: {
                                                        y: this.scrollY,
                                                    },
                                                },
                                            },
                                        ],
                                        { useNativeDriver: true }
                                    )}
                                />
                            </View>
                            {/* </View> */}
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </>
        );
    }
}

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View
                style={{
                    flex: 1,
                    borderLeftColor: "#EFEFF0",
                    borderLeftWidth: 1,
                }}
            ></View>
        </View>
    );
};
const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerMode: "none" }}
                name="Home1"
                component={Home}
            />
            <Stack.Screen
                options={{ headerMode: "none" }}
                name="BookDetail"
                component={B.BookDetail}
            />
            <Stack.Screen
                options={{ headerMode: "none" }}
                name="ReadBook"
                component={B.readBook}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.46,
        shadowRadius: 4.65,
    },
    shadowText: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
    },
});
