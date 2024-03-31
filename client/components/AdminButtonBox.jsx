import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const AdminButtonBox = ({
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
                backgroundColor: "white",
                height: 100,
                width: 100,
                borderRadius: 5,
                alignItems: "center",
                padding: 10,
                borderWidth: 1,
                borderColor: "black"
            }}
            onPress={() => handler(text)}
            disabled={loading}
        >
            <Avatar.Icon
                size={50}
                color={"black"}
                style={{ backgroundColor:"white"}}
                icon={icon}
            />
            <Text
                style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default AdminButtonBox;