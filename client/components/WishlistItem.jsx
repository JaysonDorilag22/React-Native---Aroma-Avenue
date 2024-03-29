import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { iconOptions } from "../screens/ProductDetails";

const WishlistItem = ({
  name,
  amount,
  stock,
  index,
  imgSrc,
  price,
  removeWishlistHandler,
  addToCartHandler,
  id,
  navigate,
}) => {
  const avatarOptions = {
    color: "black",
    size: 40,
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
      </View>

      <View>
        <TouchableOpacity
          onPress={() => addToCartHandler(id, name, price, imgSrc, stock)}
        >
          <Avatar.Icon icon={"cart-outline"} size={30} {...avatarOptions} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeWishlistHandler(id, name, amount, imgSrc, stock)}
        >
          <Avatar.Icon icon={"delete"} size={30} {...avatarOptions} />
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
  iconContainer: {
    alignItems: "center",
    width: "20%",
    height: 50,
    justifyContent: "space-between",
    alignSelf: "center",
  },
});

export default WishlistItem;

