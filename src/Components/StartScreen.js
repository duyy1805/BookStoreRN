import React, { useEffect } from "react";
import Background from "./component/Background";
import Logo from "./component/Logo";
import Header from "./component/Header";
import Button from "./component/Button";
import TextInput from "./component/TextInput";
import BackButton from "./component/BackButton";
import Paragraph from "./component/Paragraph";
import { theme } from "./component/core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function StartScreen({ navigation }) {
    return (
        <Background>
            <Logo />
            <Header> BooksWorld</Header>
            <Paragraph>
                Nghệ thuật đọc sách là nghệ thuật tư duy với ít nhiều sự giúp đỡ
                của người khác
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate("Login")}
            >
                Đăng nhập
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate("SignUp")}
            >
                Đăng ký
            </Button>
            <Button
                mode="outlined"
                onPress={() =>
                    navigation.navigate("TabNavigation", { token: "" })
                }
            >
                Không sử dụng tài khoản
            </Button>
        </Background>
    );
}
