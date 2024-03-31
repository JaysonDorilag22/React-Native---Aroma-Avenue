import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useMessageAndErrorOther } from "../utils/hooks";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/actions/otherActions";

const Verify = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(dispatch, navigation, "login");

  const submitHandler = () => {
    dispatch(resetPassword(otp, password));
  };
  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Reset Password</Text>
        </View>

        <View style={styles.container}>
          <Text style={{ marginLeft: 20 }}>OTP</Text>
          <TextInput
            {...inputOptions}
            secureTextEntry={true}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <Text style={{ marginLeft: 20 }}>New Password</Text>
          <TextInput
            {...inputOptions}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Button
            textColor={otp !== "" || password !== "" ? "white" : colors.color3}
            activeOpacity={0.8}
            style={{
              backgroundColor:
                otp !== "" && password !== "" ? colors.color3 : "white",
              margin: 20,
              padding: 10,
              borderRadius: 5,
              fontSize: 12,
              borderWidth: 1,
              borderColor: colors.color3,
            }}
            disabled={otp === "" || password === ""}
            onPress={submitHandler}
          >
            Reset
          </Button>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "white",
              margin: 20,
              padding: 10,
              borderRadius: 5,
              fontSize: 12,
              borderWidth: 1,
              borderColor: colors.color3,
            }}
            loading={loading}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Button loading={loading} textColor={colors.color3}>
              Resend OTP
            </Button>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Verify;
