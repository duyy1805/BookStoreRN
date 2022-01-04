
import React,{useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MyContext } from "./Context";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
const Profile = ({navigation, route }) => {
    const [btn,setBtn] = useState("Log out")
    return (
        <SafeAreaView style={styles.container}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginTop:50}}>
                    {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    <Ionicons name="md-more" size={24} color="#52575D"></Ionicons> */}
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("./assets/b.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>
            
                <View style={styles.infoContainer}>
                    <MyContext.Consumer>
                    {(context) => (
                        context.username == null ? setBtn("Return to main menu") : setBtn("Log out"),
                        <>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{context.username}</Text>
                        {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}></Text> */}
                        </>
                    )}
                    </MyContext.Consumer>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1486261062i/21898885._SY540_.jpg"}} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri:"https://sachngoaingugiare.com/wp-content/uploads/2021/09/harry-potter-and-the-sorcerers-stone.jpeg"}} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri:"https://sachngoaingugiare.com/wp-content/uploads/2021/09/Harry-Potter-and-the-Deathly-Hallows.jpeg"}} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>More...</Text>
                    </View>
                </View>
                <View style={{marginTop:50}}>
                    <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: "#F96D41",
                                    marginHorizontal: 8,
                                    marginVertical: 8,
                                    borderRadius: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    disabled: "true"
                                }}
                                onPress={() =>
                                    navigation.popToTop()
                                }
                                hidden = {true}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        lineHeight: 62,
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {btn}
                                </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});