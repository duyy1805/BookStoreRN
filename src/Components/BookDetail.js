import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Params from "../API/Params";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Popup, Toast, Root } from "popup-ui2";
import { MyContext } from "./Context";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground,
    Animated,
    ScrollView,
    NativeModules,
    Button,
} from "react-native";
import {
    AndroidImportance,
    AndroidNotificationVisibility,
    NotificationChannel,
    NotificationChannelInput,
    NotificationContentInput,
} from "expo-notifications";
import { downloadToFolder } from "expo-file-dl";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ProgressBar, Colors, Searchbar } from "react-native-paper";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import api from "../API/api";

const Dev_Height = Dimensions.get("window").height;
const Dev_width = Dimensions.get("window").width;

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
//ok

const readBook = ({ route, navigation }) => {
    const book = route.params;
    return <WebView source={{ uri: book.uri }} />;
};
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const BookDetail = ({ route, navigation }) => {
    const [colorDL, setColorDL] = useState("#EFEFF0");

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] =
        React.useState(0);
    const { book } = route.params;
    const indicator = new Animated.Value(0);

    const [stt, setStt] = useState(book.status);
    const [user, setUser] = useState();
    console.log(book.status);

    const channelId = "DownloadInfo";

    async function setNotificationChannel() {
        const loadingChannel: NotificationChannel | null =
            await Notifications.getNotificationChannelAsync(channelId);

        // if we didn't find a notification channel set how we like it, then we create one
        if (loadingChannel == null) {
            const channelOptions: NotificationChannelInput = {
                name: channelId,
                importance: AndroidImportance.HIGH,
                lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
                sound: "default",
                vibrationPattern: [250],
                enableVibrate: true,
            };
            await Notifications.setNotificationChannelAsync(
                channelId,
                channelOptions
            );
        }
    }

    useEffect(() => {
        setNotificationChannel();
    });

    // IMPORTANT: You MUST obtain MEDIA_LIBRARY permissions for the file download to succeed
    // If you don't the downloads will fail

    async function getMediaLibraryPermissions() {
        await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    }

    async function getNotificationPermissions() {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }

    const downloadProgressUpdater = ({
        totalBytesWritten,
        totalBytesExpectedToWrite,
    }: {
        totalBytesWritten: number,
        totalBytesExpectedToWrite: number,
    }) => {
        const pctg = 100 * (totalBytesWritten / totalBytesExpectedToWrite);
        // setDownloadProgress(${pctg.toFixed(0)}%);
    };

    useEffect(() => {
        getMediaLibraryPermissions();
    });

    useEffect(() => {
        getNotificationPermissions();
    });
    function DownloadBook() {
        const download = async () => {
            fetch(api.url1 + "/api/book/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: book.title1,
                    username: user
                }),
            })
                .then((res) => res.json())
                .then(async (data) => {
                    try {
                        console.log("updated");
                    } catch (e) {
                        throw (e, console.log("error", e));
                    }
                });
            // setColorDL("#62b35d")
            setStt(true);
            book.status = true;
        };
        download();
    }

    function renderBookInfoSection() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={{ uri: book.image }}
                    resizeMode="cover"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: "rgba(240,240,232,0.8)",
                    }}
                ></View>

                {/* Navigation header */}
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: 12,
                        height: 80,
                        alignItems: "flex-end",
                    }}
                >
                    <TouchableOpacity
                        style={{ marginLeft: 8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back-outline"
                            color="red"
                            size={35}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                lineHeight: 22,
                                color: "#000",
                            }}
                        >
                            Thông tin sách
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{ marginRigth: 8 }}
                        onPress={() => console.log("Click More")}
                    >
                        <Ionicons
                            name="ellipsis-horizontal-outline"
                            resizeMode="contain"
                            color="red"
                            size={35}
                        />
                    </TouchableOpacity>
                </View>

                {/* Book Cover */}
                <View style={{ flex: 5, paddingTop: 36, alignItems: "center" }}>
                    <ImageBackground
                        source={{ uri: book.image }}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: 150,
                            height: "auto",
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View
                    style={{
                        flex: 1.8,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{ fontSize: 22, lineHeight: 30, color: "#000" }}
                    >
                        {book.title1}
                    </Text>
                    <Text
                        style={{ fontSize: 16, lineHeight: 22, color: "#000" }}
                    >
                        {book.author}
                    </Text>
                </View>

                {/* Book Info */}
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 20,
                        margin: 24,
                        borderRadius: 12,
                        backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                >
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: 16,
                                lineHeight: 22,
                                color: "#FFFFFF",
                            }}
                        >
                            {book.rating}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                lineHeight: 22,
                                color: "#FFFFFF",
                            }}
                        >
                            Đánh giá
                        </Text>
                    </View>

                    {/* <LineDivider /> */}

                    {/* Pages */}
                    {/* <View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.white }}>Number of Page</Text>
                    </View> */}

                    <LineDivider />

                    {/* Language */}
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: 16,
                                lineHeight: 22,
                                color: "#FFFFFF",
                            }}
                        >
                            {book.language}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                lineHeight: 22,
                                color: "#FFFFFF",
                            }}
                        >
                            Ngôn ngữ
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    function renderBookDescription() {
        const indicatorSize =
            scrollViewWholeHeight > scrollViewVisibleHeight
                ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
                  scrollViewWholeHeight
                : scrollViewVisibleHeight;

        const difference =
            scrollViewVisibleHeight > indicatorSize
                ? scrollViewVisibleHeight - indicatorSize
                : 1;

        return (
            <View style={{ flex: 1, flexDirection: "row", padding: 12 }}>
                {/* Custom Scrollbar */}
                <View
                    style={{
                        width: 4,
                        height: "100%",
                        backgroundColor: "#282C35",
                    }}
                >
                    <Animated.View
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: "#7D7E84",
                            transform: [
                                {
                                    translateY: Animated.multiply(
                                        indicator,
                                        scrollViewVisibleHeight /
                                            scrollViewWholeHeight
                                    ).interpolate({
                                        inputRange: [0, difference],
                                        outputRange: [0, difference],
                                        extrapolate: "clamp",
                                    }),
                                },
                            ],
                        }}
                    />
                </View>

                {/* Description */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: 36 }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height);
                    }}
                    onLayout={({
                        nativeEvent: {
                            layout: { x, y, width, height },
                        },
                    }) => {
                        setScrollViewVisibleHeight(height);
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            lineHeight: 30,
                            color: "#FFFFFF",
                            marginBottom: 24,
                        }}
                    >
                        Mô tả
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            lineHeight: 30,
                            color: "#64676D",
                        }}
                    >
                        {book.description}
                    </Text>
                </ScrollView>
            </View>
        );
    }
    useEffect(() => {
        stt == true ? setColorDL("#62b35d") : setColorDL("#EFEFF0");
        console.log(stt);
        console.log(colorDL);
    }, [colorDL]);
    const renderBottomButton = (item, index) => {
        return (
            <MyContext.Consumer>
                {(context) => (
                    setUser(context.username),
                    <Root>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            {/* Bookmark */}

                            <TouchableOpacity
                                style={{
                                    width: 60,
                                    backgroundColor: "#25282F",
                                    marginLeft: 24,
                                    marginVertical: 8,
                                    borderRadius: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={async () => {
                                    if (context.token != "") {
                                        DownloadBook();
                                        const uri = book.uri;
                                        const str = book.title1;
                                        removeVietnameseTones(str)
                                        setColorDL("#62b35d");
                                        function capitalize(str) {
                                            return (
                                                str.charAt(0).toUpperCase() +
                                                str.slice(1)
                                            );
                                        }
                                        const caps = removeVietnameseTones(str)
                                            .split(" ")
                                            .map(capitalize)
                                            .join("_");
                                        console.log(caps);
                                        const filename = `${caps}.pdf`;
                                        await downloadToFolder(
                                            uri,
                                            filename,
                                            "Download",
                                            channelId,
                                            {
                                                notificationType: {
                                                    notification: "custom",
                                                },
                                                notificationContent: {
                                                    downloading: {
                                                        title: filename,
                                                    },
                                                    finished: {
                                                        title: "Complete!",
                                                    },
                                                    error: {
                                                        title: "Oops!",
                                                    },
                                                },
                                                downloadProgressCallback:
                                                    downloadProgressUpdater,
                                            }
                                        );
                                    } else {
                                        Popup.show({
                                            type: "Warning",
                                            title: "",
                                            button: true,
                                            buttonText: "THOÁT",
                                            textBody:
                                                "Vui lòng đăng nhập để tải sách",
                                            callback: () => Popup.hide(),
                                        });
                                    }
                                }}
                            >
                                <Ionicons
                                    name="download-outline"
                                    resizeMode="contain"
                                    size={35}
                                    color={colorDL} //#62b35d downloaded
                                />
                            </TouchableOpacity>

                            {/* Start Reading */}
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: "#F96D41",
                                    marginHorizontal: 8,
                                    marginVertical: 8,
                                    borderRadius: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() =>
                                    navigation.navigate("ReadBook", book)
                                }
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        lineHeight: 22,
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {" "}
                                    Nhấn để đọc
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Root>
                )}
            </MyContext.Consumer>
        );
    };

    if (book) {
        return (
            <View style={{ flex: 1, backgroundColor: "black" }}>
                {/* Book Cover Section */}
                <View style={{ flex: 4 }}>{renderBookInfoSection()}</View>
                {/* Description */}
                <View style={{ flex: 2 }}>{renderBookDescription()}</View>
                {/* ButtonDowload */}
                <View style={{ height: 70, marginBottom: 0 }}>
                    {renderBottomButton()}
                </View>
            </View>
        );
    } else {
        return <></>;
    }
};

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
export default { BookDetail, readBook };
