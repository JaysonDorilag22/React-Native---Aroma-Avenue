import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux"
import { FontAwesome } from 'react-native-vector-icons';

const Footer = ({ activeRoute = "home" }) => {
  const navigate = useNavigation();
  
  const { loading, isAuthenticated } = useSelector((state) => state.user)

  const navigationHandler = (key) => {
    switch (key) {
      case 0:
        navigate.navigate("home");
        break;
      case 1:
        navigate.navigate("cart");
        break;
      case 2:
        // if (isAuthenticated) navigate.navigate("profile");
        // else navigate.navigate("login");
        navigate.navigate("wishlist");
        break;
      default:
        navigate.navigate("Home");
        break;
    }
  };

  const avatarOptions = {
    color: colors.color2,
    size: 40,
    style: {
      backgroundColor: colors.color1,
    },
  };
  return (
    <View style={{ backgroundColor: colors.color1, width: "100%"}}>
  <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigationHandler(1)}>
      <Avatar.Icon {...avatarOptions} icon={activeRoute === "cart" ? "shopping" : "shopping-outline"} />
    </TouchableOpacity>

    <TouchableOpacity activeOpacity={0.8} onPress={() => navigationHandler(2)}>
      <Avatar.Icon {...avatarOptions} icon={activeRoute === "wishlist" ? "heart" : "heart-outline"} />
    </TouchableOpacity>

    <TouchableOpacity activeOpacity={0.8} onPress={() => navigationHandler(0)}>
      <Avatar.Icon {...avatarOptions} icon={activeRoute === "home" ? "home" : "home-outline"} />
    </TouchableOpacity>
  </View>
</View>

  );
};

export default Footer;
