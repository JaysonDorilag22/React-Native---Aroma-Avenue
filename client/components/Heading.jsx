import { View, Text } from "react-native";
import React from "react";

const Heading = () => {
  return (
    <View style={{ marginLeft: 15 }}>
      <Text style={{ fontSize: 25 }}>Welcome to</Text>
      <Text style={{ fontSize: 25, fontWeight: "900" }}>Aroma Avenue</Text>
    </View>
  );
};

export default Heading;
