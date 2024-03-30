import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/otherActions";
import { useMessageAndErrorOther } from "../utils/hooks";
import { loadUser } from "../redux/actions/userActions";
import { useIsFocused } from "@react-navigation/native";

const UpdateProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loading = useMessageAndErrorOther(dispatch, navigation, "profile");

  const submitHandler = () => {
    dispatch(updateProfile(name, email, address, city, country, pinCode));
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isFocused]);

  return (
    <View style={defaultStyle}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, marginTop:20 }}>
        <Text style={formHeading}>Edit Profile</Text>
      </View>

      <ScrollView
          showsVerticalScrollIndicator={false}
        style={{
        //   padding: 20,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <View>
        <Text style={{ marginLeft: 20 }}>Name</Text>

          <TextInput
            {...inputOptions}
            value={name}
            onChangeText={setName}
          />
        <Text style={{ marginLeft: 20 }}>Email</Text>

          <TextInput
            {...inputOptions}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        <Text style={{ marginLeft: 20 }}>Address</Text>

          <TextInput
            {...inputOptions}
            value={address}
            onChangeText={setAddress}
          />
        <Text style={{ marginLeft: 20 }}>City</Text>

          <TextInput
            {...inputOptions}
            value={city}
            onChangeText={setCity}
          />
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

          <Button
            loading={loading}
            textColor={"black"}
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "black",
              margin: 20,
            }}
            onPress={submitHandler}
          >
            Update
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
