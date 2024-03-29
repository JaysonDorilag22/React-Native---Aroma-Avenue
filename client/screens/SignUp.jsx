import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
  defaultImg,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import mime from "mime";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorUser } from "../utils/hooks";
import { register } from "../redux/actions/userActions";

const SignUp = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [googleId, setGoogleId] = useState();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const disableBtn = googleId
    ? !name || !email || !address || !city || !country || !pinCode
    : !name || !email || !password || !address || !city || !country || !pinCode;

  const submitHandler = async () => {
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("address", address);
    myForm.append("city", city);
    myForm.append("country", country);
    myForm.append("pinCode", pinCode);
    myForm.append("googleId", googleId);
    if (googleId) {
      myForm.append("file", avatar);
    } else {
      if (avatar !== "") {
        myForm.append("file", {
          uri: avatar,
          type: mime.getType(avatar),
          name: avatar.split("/").pop(),
        });
      }
    }

    try {
      await dispatch(register(myForm));
      navigation.navigate("login");
    } catch (error) {
      console.error(error);
      // handle error here
    }
  };

  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.picture);
      setGoogleId(user.sub);
      setPassword(googleId);
    }
  }, [user]);
  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Sign Up</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
          }}
        >
          <View style={{ minHeight: 900 }}>
            <Avatar.Image
              style={{
                alignSelf: "center",
                backgroundColor: colors.color1,
              }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
              <Button textColor={colors.color1}>Change Photo</Button>
            </TouchableOpacity>
            <Text style={{ marginLeft: 20 }}>Name</Text>

            <TextInput {...inputOptions} value={name} onChangeText={setName} />
            <Text style={{ marginLeft: 20 }}>Email</Text>

            <TextInput
              {...inputOptions}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={{ marginLeft: 20 }}>Password</Text>

            {!googleId && (
              <TextInput
                {...inputOptions}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            )}
            <Text style={{ marginLeft: 20 }}>Address</Text>

            <TextInput
              {...inputOptions}
              value={address}
              onChangeText={setAddress}
            />
            <Text style={{ marginLeft: 20 }}>City</Text>

            <TextInput {...inputOptions} value={city} onChangeText={setCity} />
            <Text style={{ marginLeft: 20 }}>Country</Text>

            <TextInput
              {...inputOptions}
              value={country}
              onChangeText={setCountry}
            />
            <Text style={{ marginLeft: 20 }}>Pin Code</Text>

            <TextInput
              {...inputOptions}
              value={pinCode}
              onChangeText={setPinCode}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              loading={loading}
              textColor={colors.color2}
              disabled={disableBtn}
              style={styles.btn}
              onPress={submitHandler}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Sign In
              </Text>
            </TouchableOpacity>

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
        </ScrollView>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default SignUp;
