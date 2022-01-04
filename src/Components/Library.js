import { StatusBar } from "expo-status-bar";
import React from "react";
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
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import B from "./BookDetail";
import api from "../API/api.js";
import { ProgressBar, Colors, Searchbar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import TextInput from "./component/TextInput";

const Dev_Height = Dimensions.get("window").height;
const Dev_width = Dimensions.get("window").width;

class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            refreshing: true,
        };
    }
    getItem = () => {
        fetch(api.url1 + "/api/book/show/downloaded")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                console.log(this.props.route);
                this.setState({
                    items: data,
                    refreshing: false,
                });
            });
    };
    componentDidMount() {
        this.getItem();
    }

    componentWillUnmount() {
        this.setState.item = null;
    }
    onRefresh = () => {
        //Clear old data of the list
        this.state.items = null;
        //Call the Service to get the latest data
        this.getItem();
    };

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
                        { height: 250, width: 140, margin: 10 },
                    ]}
                >
                    <Text
                        style={{
                            marginTop: "100%",
                            color: "#FFF",
                            fontSize: 15,
                            marginLeft: 10,
                            fontWeight: "bold",
                        }}
                    >
                        {item.title1}
                    </Text>
                    <Text
                        style={{ color: "#FFF", fontSize: 14, marginLeft: 10 }}
                    >
                        {item.author}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    };
    render() {
        return (
            // <SafeAreaView style = {{
            //   height : Dev_Height,
            //   width : Dev_width
            // }}>
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
                        height: "15%",
                        width: "100%",
                        paddingTop: 20,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(240,240,232,0.6)",
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Library
                    </Text>
                    {/* <TouchableOpacity onPress={() => this.setState({items: null})} style = {{marginLeft:"70%"}}>
                    <Ionicons name = "refresh-outline" size = {32} color= "#7FA1F8"/>
          </TouchableOpacity> */}
                </View>
                <View>
                    {this.state.refreshing ? <ActivityIndicator /> : null}
                    <FlatList
                        data={this.state.items}
                        renderItem={this._render_item}
                        keyExtractor={(item) => item._id.toString()}
                        numColumns={2}
                        style={{ marginLeft: "7%", height: 620, width: "100%" }}
                        ItemSeparatorComponent={() => (
                            <View style={{ width: 13, height: 13 }} />
                        )}
                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                    />
                </View>
            </>
            // </SafeAreaView>
        );
    }
}

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerMode: "none" }}
                name="Library_1"
                component={Library}
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
});
