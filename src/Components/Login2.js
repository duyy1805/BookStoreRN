import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Popup, Root } from "popup-ui";
import Background from "./component/Background";
import Logo from "./component/Logo";
import Header from "./component/Header";
import Button from "./component/Button";
import api from "../API/api.js";
import TextInput from "./component/TextInput";
import BackButton from "./component/BackButton";
import { theme } from "./component/core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    useEffect(() => {
        AsyncStorage.removeItem("token");
    }, []);
    const sendCred = async ({ navigation }) => {
        fetch(api.url2 + "/api/auth/login", {
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
                    console.log(data.accessToken);

                    const token = data.accessToken;

                    if (token != undefined) {
                        navigation.navigate("TabNavigation", {
                            token,
                            username,
                        });
                    } else {
                        Popup.show({
                            type: "Danger",
                            title: "Đăng nhập thất bại",
                            button: true,
                            buttonText: "Thử lại",
                            textBody: "Tài khoản hoặc mật khẩu sai",

                            callback: () => Popup.hide(),
                        });
                    }
                } catch (e) {
                    Popup.show({
                        type: "Danger",
                        title: "Đăng nhập thất bại",
                        button: true,
                        buttonText: "Thử lại",
                        textBody: "Tài khoản hoặc mật khẩu sai",

                        callback: () => Popup.hide(),
                    });
                }
            });
    };

    return (
        <Root>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Welcome back</Header>
                <TextInput
                    label="Tài khoản"
                    returnKeyType="next"
                    // value={username.value}
                    onChangeText={(text) => setUsername(text)}
                    // error={!!email.error
                    // errorText={email.error}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Mật khẩu"
                    returnKeyType="done"
                    // value={password.value}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                    //   onPress={() => navigation.navigate('ResetPasswordScreen')}
                    >
                        <Text style={styles.forgot}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    mode="contained"
                    onPress={() => {
                        sendCred({ navigation });
                    }}
                >
                    Đăng nhập
                </Button>

                <View style={styles.row}>
                    <Text>Chưa có tài khoản? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.replace("SignUp")}
                    >
                        <Text style={styles.link}>Đăng kí</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </Root>
    );
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 24,
    },
    row: {
        flexDirection: "row",
        marginTop: 70,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary,
    },
});
