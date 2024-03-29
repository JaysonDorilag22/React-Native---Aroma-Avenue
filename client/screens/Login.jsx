import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  linkContainer,
  formStyles as styles,
} from "../styles/styles";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyToken } from "../redux/actions/userActions";
import Toast from "react-native-toast-message";
import logo from "../assets/logo.png"
import { useMessageAndErrorUser } from "../utils/hooks";
import { CLIENT_ID_WEB, CLIENT_ID_ANDROID, CLIENT_ID_IOS } from "@env";
const Login = ({ navigation }) => {
  const [error, setError] = useState();

  const { newUser, user } = useSelector((state) => state.user);
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID_WEB,
      androidClientId: CLIENT_ID_ANDROID,
      iosClientId: CLIENT_ID_IOS,
    });
  };
  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });
  };

  useEffect(() => {
    console.log(user);
    if (user && user.googleId) {
      console.log("User with Google ID found");
      navigateToHome();
    } else if (user && user.signInMethod === "local") {
      // User logged in via email and password
      console.log("User with email found");
      navigateToHome();
    } else if (newUser) {
      console.log("verified yung token at di pa existing");
      navigation.navigate("signup");
      // showToast("success", "Kindly complete your profile before continue");
    }
  }, [newUser, user, navigation]);

  useEffect(() => {
    configureGoogleSignIn();
    GoogleSignin.signOut();
  });

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

  const submitHandler = () => {
    dispatch(login(email, password));
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      dispatch(verifyToken(userInfo.idToken));
      setError();
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Image
      source={logo}
      style={{ width: 100, height: 100, marginBottom: -60, alignItems: "center" }} // Adjust width, height, and margin as needed
    />
    </View>
        <View style={styles.container}>
          <Text style={{ marginLeft: 20 }}>Email</Text>
          <TextInput
            {...inputOptions}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={{ marginLeft: 20 }}>Password</Text>
          <TextInput
            {...inputOptions}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.linkContainer}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("forgetpassword")}
            >
              <Text style={[styles.forget, { textDecorationLine: 'underline' }]}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("signup")}
            >
              <Text style={[styles.link, { textDecorationLine: 'underline' }]}>Sign Up</Text>

            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={submitHandler}
            disabled={loading || email === "" || password === ""}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>
          <Text style={styles.or}>Continue with</Text>
          
          <GoogleSigninButton
            style={{ margin: 20, width: "auto" }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
          />
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Login;
