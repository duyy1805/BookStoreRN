import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView,
          Dimensions, TouchableOpacity,
          FlatList,Image,ImageBackground,Animated,
          ScrollView,NativeModules
} from 'react-native';
import {Ionicons, AntDesign} from "@expo/vector-icons"
import { ProgressBar, Colors, Searchbar } from 'react-native-paper';
import {WebView} from 'react-native-webview'
import { createStackNavigator } from '@react-navigation/stack';

const Dev_Height = Dimensions.get('window').height
const Dev_width = Dimensions.get('window').width

// const [books,setBooks] = useState()


const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: "#EFEFF0", borderLeftWidth: 1 }}></View>
        </View>
    )
}
//ok
const readBook =({route,navigation}) => {
    const book = route.params;
    return(
    <WebView source={{ uri: book.uri}} />
    )
  }
const BookDetail = ({route,navigation}) => {
    const [colorDL,setColorDL] = useState("#EFEFF0")
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
    const {book} = route.params;
    const indicator = new Animated.Value(0);
    const [stt,setStt] = useState(book.status)
    console.log(book.status)
    function DownloadBook() {
        // const {book} = route.params;
        // console.log(book.status)
        const download = async () => {
            fetch('http:192.168.8.102:5000/api/book/download',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    title: book.title1
                }),
            })
            .then((res) => res.json())
            .then(async (data) => {
                try {
                    console.log('updated')
                } catch (e) {
                    throw e,
                    console.log("error",e)
                }
            })
            // setColorDL("#62b35d")
            setStt(true)
            book.status= true
        }
        download();
    }
    function renderBookInfoSection() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={{uri:book.image}}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: "rgba(240,240,232,0.8)"
                    }}
                >
                </View>

                {/* Navigation header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: 12, height: 80, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginLeft: 8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back-outline"
                            color="red" size={35}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 22 , color: "#000" }}>Book Detail</Text>
                    </View>

                    <TouchableOpacity
                        style={{ marginRigth: 8 }}
                        onPress={() => console.log("Click More")}
                    >
                        <Ionicons
                            name ="ellipsis-horizontal-outline"
                            resizeMode="contain"
                            color="red" size={35}
                        />
                    </TouchableOpacity>
                </View>

                {/* Book Cover */}
                <View style={{ flex: 5, paddingTop: 36, alignItems: 'center' }}>
                    <ImageBackground
                        source={{uri:book.image}}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: 150,
                            height: "auto"
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, lineHeight: 30 , color: "#000" }}>{book.title1}</Text>
                    <Text style={{fontSize: 16, lineHeight: 22, color: "#000" }}>{book.author}</Text>
                </View>

                {/* Book Info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: 24,
                        borderRadius: 12,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}
                >
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 22, color: "#FFFFFF" }}>{book.rating}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22 , color: "#FFFFFF" }}>Rating</Text>
                    </View>

                    {/* <LineDivider /> */}

                    {/* Pages */}
                    {/* <View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.white }}>Number of Page</Text>
                    </View> */}

                    <LineDivider />

                    {/* Language */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 22, color: "#FFFFFF" }}>{book.language}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22 , color: "#FFFFFF" }}>Language</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription() {

        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1

        return (
            <View style={{ flex: 1, flexDirection: 'row', padding: 12 }}>
                {/* Custom Scrollbar */}
                <View style={{ width: 4, height: "100%", backgroundColor: "#282C35" }}>
                    <Animated.View 
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: '#7D7E84',
                            transform: [{
                                translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                    inputRange: [0, difference],
                                    outputRange: [0, difference],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}
                    />
                </View>

                {/* Description */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: 36 }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height)
                    }}
                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <Text style={{ fontSize: 22, lineHeight: 30, color: "#FFFFFF", marginBottom: 24 }}>Description</Text>
                    <Text style={{ fontSize: 20, lineHeight: 30, color: "#64676D" }}>{book.description}</Text>
                </ScrollView>
            </View>
        )
    }

    const renderBottomButton = (item,index) => {
        useEffect( () => {
            stt == true ? setColorDL("#62b35d") : setColorDL("#EFEFF0")
            console.log(stt)
            console.log(colorDL)
        },[colorDL]);
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: "#25282F",
                        marginLeft: 24,
                        marginVertical: 8,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={ () => {
                        DownloadBook()
                        setColorDL("#62b35d")
                        }
                    }
                >
                    <Ionicons
                        name="download-outline"
                        resizeMode="contain"
                        size={35} color={colorDL} //#62b35d downloaded
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
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("ReadBook",book)}
                >
                    <Text style={{ fontSize: 16, lineHeight: 22, color: "#FFFFFF" }}>Start Reading</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    if(book){
        return(
            <View style={{ flex: 1, backgroundColor: "black" }}>
            {/* Book Cover Section */}
            <View style={{ flex: 4 }}>
                {renderBookInfoSection()}
            </View>
             {/* Description */}
             <View style={{ flex: 2 }}>
                    {renderBookDescription()}
            </View>
            <View style={{ height: 70, marginBottom: 0 }}>
                    {renderBottomButton()}
            </View>
        </View>
        )    
    }
    else{
        return(
            <></>
        )
    }
}

export default {BookDetail,readBook};
