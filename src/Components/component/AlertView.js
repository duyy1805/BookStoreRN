import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Popup, Root } from "popup-ui";

const AlertView = () => {
    return (
        <Root>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3498db",
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        Popup.show({
                            type: "Success",
                            title: "Đăng ký thành công",
                            button: true,
                            buttonText: "Ok",

                            callback: () => Popup.hide(),
                        })
                    }
                ></TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        Popup.show({
                            type: "Warning",
                            title: "Chú ý",
                            textBody: "Bạn phải đăng nhập để tải sách",
                            buttontext: "Continue",
                            callback: () => Popup.hide(),
                        })
                    }
                >
                    <Text>Popup Warning</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        Popup.show({
                            type: "Danger",
                            title: "Upload failed",
                            textBody:
                                "Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again",
                            buttontext: "Try again",
                            callback: () => Popup.hide(),
                        })
                    }
                >
                    <Text>Popup Danger</Text>
                </TouchableOpacity>
            </View>
        </Root>
    );
};

export default AlertView;
