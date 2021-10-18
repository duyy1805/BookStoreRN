import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const sendCred = async ({ navigation }) => {
        fetch("http://172.20.10.3:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then(async (data) => {
                try {
                    console.log(data);
                    // alert(data.user.email);

                    await AsyncStorage.setItem("token", data.accessToken);
                    // await AsyncStorage.setItem("username", data.user.username);
                    alert("Đăng kí tài khoản thành công");
                    navigation.replace("TabNavigation");
                } catch (e) {
                    alert("Tên người dùng đã tồn tại");
                }
            });
    };
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("../Assets/bookLogo.jpg")}
            />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Tài khoản"
                    placeholderTextColor="#003f5c"
                    onChangeText={(username) => setUsername(username)}
                />
            </View>

            <View style={styles.inputView1}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                    sendCred({ navigation });
                }}
            >
                <Text style={styles.loginText}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 20,
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        bottom: 30,
        alignItems: "center",
    },
    inputView1: {
        bottom: 30,
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 40,

        alignItems: "center",
    },

    TextInput: {
        height: 40,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FF1493",
    },
});
