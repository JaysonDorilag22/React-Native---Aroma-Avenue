import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/actions/otherActions";
import { useMessageAndErrorOther } from "../utils/hooks";
import passwordlogo from "../assets/password.png"
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(dispatch);

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    alert("shEysh");

    setOldPassword("");
    setNewPassword("");
  };
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, paddingBottom: 50 }}>
        <Text style={formHeading}>Change Password</Text>
      </View>
      <View style={{ alignItems: "center"}}>
        <Image source={passwordlogo} style={{ width: 200, height: 150 }} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{ marginLeft: 20 }}>Old Password</Text>

        <TextInput
          {...inputOptions}
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Text style={{ marginLeft: 20 }}>New Password</Text>

        <TextInput
          {...inputOptions}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Button
          loading={loading}
          textColor={"black"}
          disabled={oldPassword === "" || newPassword === ""}
          style={{
            backgroundColor: "white",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "black",
              margin: 20,
          }}
          onPress={submitHandler}
        >
          Change
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;
