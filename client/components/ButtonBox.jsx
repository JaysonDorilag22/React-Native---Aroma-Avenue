import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const ButtonBox = ({
    icon,
    text,
    handler,
    reverse = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                backgroundColor:"white",
                height: 80,
                width: 80,
                borderRadius: 5,
                borderWidth: 1,
                alignItems: "center",
            }}
            onPress={() => handler(text)}
            disabled={loading}
        >
            <Avatar.Icon
                size={50}
                color={"black"}
                style={{ backgroundColor: "white" }}
                icon={icon}
            />
            <Text
                style={{
                    color: "black",
                    textAlign: "center",
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default ButtonBox;