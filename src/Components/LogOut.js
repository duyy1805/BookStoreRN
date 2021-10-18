import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Popup, Root } from "popup-ui";
import Background from "./component/Background";
import Logo from "./component/Logo";
import Header from "./component/Header";
import Button from "./component/Button";
export default function LogOut({ navigation }) {
    return (
        <Background>
            <Logo />
            <Header>Let’s start</Header>
            <Paragraph>
                Your amazing app starts here. Open you favorite code editor and
                start editing this project.
            </Paragraph>
            <Button
                mode="outlined"
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "StartScreen" }],
                    })
                }
            >
                Logout
            </Button>
        </Background>
    );
}
