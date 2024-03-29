import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import { FontAwesome } from "react-native-vector-icons";
import { Avatar } from "react-native-paper";

const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCardHandler,
  addToWishlistHandler,
  i,
  navigate,
}) => {
  const isOutOfStock = stock === 0;

  const avatarOptions = {
    color: "black",
    size: 30,
    style: {
      backgroundColor: "white",
    },
  };
  return (
    <TouchableOpacity
    activeOpacity={1}
    onPress={() => navigate.navigate("productdetails", { id })}
    style={{ width: "50%", padding: 5 }}
  >
    <View style={{ width: 155, height: 220, margin: 5, borderRadius: 5, borderWidth: 1, borderColor: colors.color5 }}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 120, resizeMode: "contain" }}
        />
        <TouchableOpacity onPress={() => addToWishlistHandler(id, name, price, image, stock)} style={{ position: 'absolute', top: 5, right: 5 }}>
          <Avatar.Icon {...avatarOptions} icon="heart-outline" />
        </TouchableOpacity>
      </View>
  
      <View style={{ padding: 5, marginLeft: 5, flex: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: "300" }}>
          {name}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "700" }}>${price}</Text>
      </View>
  
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5 }}>
      <Button
        onPress={() => addToCardHandler(id, name, price, image, stock)}
        textColor="white"
        style={{ flex: 1, borderRadius: 5, marginRight: 5, backgroundColor: isOutOfStock ? colors.color5 : 'black' }}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
      </Button>
    </View>
    </View>
  </TouchableOpacity>
  



  );
};

export default ProductCard;
