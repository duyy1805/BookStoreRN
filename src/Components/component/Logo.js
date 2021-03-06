import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
    return (
        <Image source={require("../../Assets/logo.png")} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 130,
        marginBottom: 8,
        marginTop: 100,
    },
});
