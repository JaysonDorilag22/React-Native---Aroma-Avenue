import { View, Text } from "react-native";
import React from "react";

const Heading = ({ text1 = "Our", text2 = "Products", containerStyle }) => {
  return (
    <View style={{ marginLeft: 15, marginTop:10}}>
      <Text style={{ fontSize: 20 }}>{text1}</Text>
      <Text style={{ fontSize: 20, fontWeight: "900" }}>{text2}</Text>
    </View>
  );
};

export default Heading;