import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { colors } from "../styles/styles";
import MyModal from "../components/MyModal";

const ProductListItem = ({
  navigate,
  deleteHandler,
  i,
  id,
  price,
  stock,
  name,
  category,
  images,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => setOpenModal((prev) => !prev)}
        onPress={() => navigate.navigate("productdetails", { id })}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: "black",
          }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: images[0].url }} 
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                marginRight: 10, 
              }}
            />
          ))}

          <Text
            style={{
              width: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            ₱{price}
          </Text>

          <Text
            style={{
              maxWidth: 120,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <Text
            style={{
              width: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {category}
          </Text>

          <Text
            style={{
              width: 40,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {stock}
          </Text>
        </View>
      </TouchableOpacity>

      {openModal && (
        <MyModal
          id={id}
          deleteHandler={deleteHandler}
          navigate={navigate}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default ProductListItem;
