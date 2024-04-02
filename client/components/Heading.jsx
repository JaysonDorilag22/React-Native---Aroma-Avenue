import { View, Text } from "react-native";
import React from "react";

const Heading = ({ text2 = "Products", containerStyle }) => {
  return (
    <View style={{ marginLeft: 20, marginTop:40}}>
      <Text style={{ fontSize: 20, fontWeight: "900" }}>{text2}</Text>
    </View>
  );
};

export default Heading;