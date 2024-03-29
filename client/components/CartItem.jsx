import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { iconOptions } from "../screens/ProductDetails";

const CartItem = ({
  name,
  amount,
  qty,
  stock,
  index,
  imgSrc,
  id,
  price,
  decrementHandler,
  incrementhandler,
  addToWishlistHandler,
  navigate,
}) => {
  const avatarOptions = {
    color: "black",
    size: 30,
    style: {
      backgroundColor: "white",
    },
  };
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        marginVertical: 20,
      }}
    >
      <View
        style={{
          width: "40%",
          backgroundColor: 'white',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          borderWidth: 1, borderColor: colors.color5
        }}
      >
        <Image
          source={{
            uri: imgSrc,
          }}
          style={styles.img}
        />
      </View>
      <View
        style={{
          width: "40%",
          paddingHorizontal: 25,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
          }}
          onPress={() => navigate.navigate("productdetails", { id })}
        >
          {name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            fontWeight: "900",
          }}
        >
          ${amount}
        </Text>
        <TouchableOpacity
          style={styles.addToWishlistButton}
          onPress={() => addToWishlistHandler(id, name, price, imgSrc, stock)}
        >
          <Avatar.Icon icon={"heart-outline"}  {...avatarOptions} />
        </TouchableOpacity>
      </View>

      <View style={styles.qtyContainer}>
        <TouchableOpacity
          onPress={() => decrementHandler(id, name, amount, imgSrc, stock, qty)}
        >
          <Avatar.Icon
            icon={"minus"}
            size={20}
            style={{
              borderRadius: 5,
              backgroundColor: colors.color5,
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.qtyText}>{qty}</Text>

        <TouchableOpacity
          onPress={() => incrementhandler(id, name, amount, imgSrc, stock, qty)}
        >
          <Avatar.Icon
            icon={"plus"}
            size={20}
            style={{
              borderRadius: 5,
              backgroundColor: colors.color5,
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: "100%",
    resizeMode: "contain",
    top: "-20%",
    left: "10%",
  },
  qtyText: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  qtyContainer: {
    alignItems: "center",
    width: "20%",
    height: 80,
    justifyContent: "space-between",
    alignSelf: "center",
  },
});

export default CartItem;
