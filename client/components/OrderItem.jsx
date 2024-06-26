import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const OrderItem = ({
  id,
  price,
  address,
  orderedOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  loading,
  i = 0,
}) => {
  const navigation = useNavigation("Comment");

  const getProductIds = () => {
    return orderItems.map((item) => item.product);
  };

  console.log(getProductIds._id)
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: "white",
        }}
      >
        ID - #{id}
      </Text>

      <TextBox title={"Address"} value={address} i={i} />
      <TextBox title={"Ordered On"} value={orderedOn} i={i} />
      <TextBox title={"Price"} value={price} i={i} />
      <TextBox title={"Status"} value={status} i={i} />
      <TextBox title={"Payment Method"} value={paymentMethod} i={i} />

      {/* {!admin && status === "Delivered" && (
        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: "black",
            margin: 20,
            padding: 6,
          }}
          onPress={() => navigation.navigate("comment", { orderItems: getProductIds })}
        >
          Write a Review
        </Button>
      )} */}

      {admin && (
        <Button
          icon={"update"}
          mode={"contained"}
          textColor={i % 2 === 0 ? colors.color2 : colors.color3}
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2,
          }}
          onPress={() => updateHandler(id)}
          loading={loading}
          disabled={loading}
        >
          Update
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: "black",  // Set text color to black
      backgroundColor: "white",  // Set background color to white
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {title === "Price" ? "$" : ""}
    {value}
  </Text>
);


const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "grey"
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default OrderItem;
