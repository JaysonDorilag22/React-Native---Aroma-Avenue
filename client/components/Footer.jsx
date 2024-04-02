import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import { FontAwesome } from "react-native-vector-icons";
import { colors } from "../styles/styles"; // assuming you have defined your colors in this file

const Footer = ({ activeRoute = "home" }) => {
  const navigate = useNavigation();

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const navigationHandler = (key) => {
    switch (key) {
      case 0:
        navigate.navigate("home");
        break;
      case 1:
        navigate.navigate("cart");
        break;
      case 2:
        navigate.navigate("wishlist");
        break;
      case 3:
        if (isAuthenticated) {
          navigate.navigate("profile");
        } else {
          navigate.navigate("login"); // Redirect to login if not authenticated
        }
        break;
      default:
        navigate.navigate("home");
        break;
    }
  };

  const avatarOptions = {
    color: "black",
    size: 35,
    style: {
      backgroundColor: "white",
    },
  };

  const textOptions = {
    textAlign: "center",
    fontSize: 10,
    color: colors.color1,
    marginTop: -8,
  };

  return (
    <View
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: colors.color5,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(0)}
        >
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "home" ? "home" : "home-outline"}
          />
          <Text style={textOptions}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(3)}
        >
          <Avatar.Icon
            {...avatarOptions}
            icon={
              activeRoute === "profile"
                ? "account-circle"
                : "account-circle-outline"
            }
          />
          <Text style={textOptions}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(2)}
        >
          <Badge
            visible={wishlistItems.length > 0}
            size={20}
            style={{ position: "absolute", top: -4, right: -4, zIndex: 1 }}
          >
            {wishlistItems.length}
          </Badge>
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "wishlist" ? "heart" : "heart-outline"}
          />
          <Text style={textOptions}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(1)}
        >
          <Badge
            visible={cartItems.length > 0}
            size={20}
            style={{ position: "absolute", top: -4, right: -4, zIndex: 1 }}
          >
            {cartItems.length}
          </Badge>
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "cart" ? "cart" : "cart-outline"}
          />
          <Text style={textOptions}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
