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
import { useDispatch } from "react-redux";
import { forgetPassword } from "../redux/actions/otherActions";
import { useMessageAndErrorOther } from "../utils/hooks";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, "verify");

  const submitHandler = () => {
    dispatch(forgetPassword(email));
  };
  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Forget Password</Text>
        </View>

        <View style={styles.container}>
        <Text style={{ marginLeft: 20 }}>Email</Text>

          <TextInput
            {...inputOptions}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Button
            loading={loading}
            textColor={colors.color2}
            disabled={email === ""}
            style={{
                backgroundColor: "white",
                margin: 20,

                borderRadius: 5,
                fontSize: 12,
                backgroundColor: colors.color3
              }}
            onPress={submitHandler}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
                Send OTP
              </Text>
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
              onPress={() => {
                dispatch({ type: "resetUser" });
                navigation.navigate("login");
              }}
            >
              <Text style={{ color: "black", textAlign: "center" }}>
                Log In
              </Text>
            </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default ForgetPassword;