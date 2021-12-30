import React from "react";

import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createStackNavigator } from '@react-navigation/stack';
import Animated, { Easing, timing } from 'react-native-reanimated'
import { FlatList } from "react-native-gesture-handler";
import B from './BookDetail'

const { Value, timeing } = Animated

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
//fsd
class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        //state
        this.state = {
            items: [],
            isForcused: false,
            keyword: ''
        }
        // animatione values
        this._input_box_translate_x = new Value(width)
        this._back_button_opacity = new Value(0)
        this._content_translate_y = new Value(height)
        this._content_opacity = new Value(0)
    }
    componentDidUpdate() {
        if (this.state.items == null) {
            const getItem = () => {
                fetch('http:192.168.8.100:5000/api/book/autocomplete', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: this.state.keyword.trim()
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            items: data
                        })
                    }
                    )
            }
            getItem()
        }
    }
    _render_item = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "row", width: "80%" }}>
                <View style={{ height: "100%", width: "27%", marginLeft: "7%", marginTop: 40, marginBottom: 40 }}>
                    <TouchableOpacity style={styles.search_item} onPress={() => this.props.navigation.navigate("BookDetail", { book: item })}>
                        <ImageBackground source={{ uri: item.image }} imageStyle={{ borderRadius: 15 }} style={[styles.shadow, { height: 100, width: "100%" }]} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: "10%", marginTop: "5%" }}>{item.title1}</Text>
                    <Text style={{ marginLeft: "10%", marginTop: "5%" }}>{item.author}</Text>
                </View>
            </View>
        )
    }

    _onFocus = () => {
        //update state
        this.setState({ isForcused: true })
        //animation config
        // input box
        const input_box_translate_x_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }
        // content 
        const content_translate_y_config = {
            duration: 0,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }

        //run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()

        // force blur
        this.refs.input.focus()

    }
    _onBlur = () => {
        //update state
        this.setState({ isForcused: false })
        //animation config
        // input box
        const input_box_translate_x_config = {
            duration: 200,
            toValue: width,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
            duration: 50,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        // content 
        const content_translate_y_config = {
            duration: 0,
            toValue: height,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }

        //run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()

        // force blur
        this.refs.input.blur()
    }
    render() {
        return (

            <>
                <ImageBackground source={{ uri: "https://kenh14cdn.com/2020/9/25/hinh-nen-iphone-11-1600990116056809485952.jpg" }} style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
                <View style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(240,240,232,0.3)",
                }} />
                <SafeAreaView style={styles.header_safe_area}>
                    <View style={styles.header}>
                        <View style={styles.header_inner}>
                            <View>
                                <Image
                                    source={require('../Assets/Bookshop-Logo.png')}
                                    style={{ height: 50, width: 150 }}
                                />
                            </View>
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor={'#ccd0d5'}
                                onPress={this._onFocus}
                                style={styles.search_icon_box}
                            >
                                <Icon name="search" size={22} color='#000000' />
                            </TouchableHighlight>
                            <Animated.View
                                style={[styles.input_box, { transform: [{ translateX: this._input_box_translate_x }] }]}
                            >
                                <Animated.View style={{ opacity: this._back_button_opacity }}>
                                    <TouchableHighlight
                                        activeOpacity={1}
                                        underlayColor={"#ccd0d5"}
                                        onPress={this._onBlur}
                                        style={styles.back_icon_box}
                                    >
                                        <Icon name="chevron-left" size={22} color="#000000" />
                                    </TouchableHighlight>
                                </Animated.View>
                                <TextInput
                                    ref="input"
                                    placeholder="Search book"
                                    clearButtonMode="always"
                                    value={this.state.keyword}
                                    onChangeText={(value) => this.setState({ items: null, keyword: value })}
                                    style={styles.input}
                                />
                            </Animated.View>
                        </View>
                    </View>
                </SafeAreaView>
                <View style={styles.content_trendy}>
                    <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 40, marginTop: 50 }}>Trending</Text>
                    <View style={styles.separator} />
                    <ScrollView style={{}}>
                        <View style={styles.search_item}>
                            <Icon style={styles.item_icon} name="search" size={23} color="#cccccc" />
                            <Text style={styles.trendy_text}>Kết quả 1 nè </Text>
                        </View>
                        <View style={styles.search_item}>
                            <Icon style={styles.item_icon} name="search" size={23} color="#cccccc" />
                            <Text style={styles.trendy_text}>Kết quả 2 nè </Text>
                        </View>
                        <View style={styles.search_item}>
                            <Icon style={styles.item_icon} name="search" size={23} color="#cccccc" />
                            <Text style={styles.trendy_text}>Kết quả 3 nè </Text>
                        </View>
                        <View style={styles.search_item}>
                            <Icon style={styles.item_icon} name="search" size={23} color="#cccccc" />
                            <Text style={styles.trendy_text}>Kết quả 4 nè </Text>
                        </View>
                    </ScrollView>
                </View>
                <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{ translateY: this._content_translate_y }] }]}>
                    <SafeAreaView style={styles.content_safe_area}>
                        <ImageBackground source={{ uri: "https://kenh14cdn.com/2020/9/25/hinh-nen-iphone-11-1600990116056809485952.jpg" }} style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
                        <View style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            backgroundColor: "rgba(240,240,232,0.3)",
                        }} />
                        <View style={styles.content_inner}>
                            <View style={styles.separator} />
                            <View style={{ height: 610 }}>
                                {
                                    this.state.keyword === ''
                                        ?
                                        <View style={styles.image_placeholder_container}>
                                            <Image
                                                source={require("../Assets/Search.png")}
                                                style={styles.image_placeholder}
                                            />
                                            <Text style={styles.image_placeholder_text}>
                                                Enter a few word
                                            </Text>
                                        </View>
                                        :
                                        <View style={{ height: 610 }}>
                                            <FlatList
                                                data={this.state.items}
                                                renderItem={this._render_item}
                                                keyExtractor={item => item._id.toString()}
                                                style={{ marginLeft: "7%", height: 300, width: "100%", marginTop: 10 }}
                                                ItemSeparatorComponent={
                                                    () => <View style={{ width: "30%", height: 20 }} />
                                                }
                                            />
                                        </View>
                                }
                            </View>
                        </View>
                    </SafeAreaView>
                </Animated.View>
            </>
        )
    }
}

// export default SearchBar

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerMode: 'none' }} name="SearchBar" component={SearchBar} />
            <Stack.Screen options={{ headerMode: 'none' }} name="BookDetail" component={B.BookDetail} />
        </Stack.Navigator>
    );

}



const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000
    },
    header: {
        marginTop: '5%',
        height: 50,
        paddingHorizontal: 16
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#c4d1e7',
        width: width - 32,
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    content_trendy: {
        width: width,
        height: height,
    },
    trendy_text: {
        fontSize: 17
    },
    search_item: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e6eb',
        marginLeft: 16
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15
    },
    content: {
        width: width,
        height: height,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 999,
    },
    content_safe_area: {
        flex: 1,
        backgroundColor: 'white',
    },
    content_inner: {
        marginTop: '5%',
        flex: 1,
        paddingTop: 50
    },
    separator: {
        marginTop: 5,
        height: 1,
        backgroundColor: '#e6e4eb',
    },
    image_placeholder_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-50%'
    },
    image_placeholder: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    image_placeholder_text: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 5
    },
    item_icon: {
        marginLeft: 15,
        marginRight: 15
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.57,
        shadowRadius: 4.65,
    }
})