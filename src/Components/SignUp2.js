import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Popup, Root } from "popup-ui";
import Background from "./component/Background";
import Logo from "./component/Logo";
import Header from "./component/Header";
import Button from "./component/Button";
import TextInput from "./component/TextInput";
import BackButton from "./component/BackButton";
import { theme } from "./component/core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const sendCred = async ({ navigation }) => {
        fetch("http://70.1.1.111:5000/api/auth/register", {
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
                    alert(data.accessToken);
                    const token = data.accessToken;
                    // await AsyncStorage.setItem("username", data.user.username);
                    await Popup.show({
                        type: "Success",
                        title: "Đăng ký thành công",
                        button: true,
                        buttonText: "Ok",
                        // textBody: "Congrats! Your upload successfully done",

                        callback: () => {
                            Popup.hide();
                            navigation.navigate("TabNavigation", { token });
                        },
                    });
                } catch (e) {
                    await Popup.show({
                        type: "Danger",
                        title: "Đăng ký thất bại",
                        button: true,
                        buttonText: "Thử lại",
                        textBody: "Tài khoản đã tồn tại",

                        callback: () => {
                            Popup.hide();
                        },
                    });
                }
            });
    };
    return (
        <Root>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Tạo tài khoản</Header>
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
                    // error={!!password.error}
                    // errorText={password.error}
                    secureTextEntry
                />
                <Button
                    mode="contained"
                    onPress={() => {
                        sendCred({ navigation });
                        console.log(username, password);
                    }}
                    style={{ marginTop: 24 }}
                >
                    Đăng ký
                </Button>
                <View style={styles.row}>
                    <Text>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.replace("Login")}
                    >
                        <Text style={styles.link}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </Root>
    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary,
    },
});
