import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import ImageCard from "../../components/ImageCard";
import { Avatar, Button } from "react-native-paper";
import { useMessageAndErrorOther } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import mime from "mime";
import {
  deleteProductImage,
  updateProductImage,
} from "../../redux/actions/otherActions";

const ProductImages = ({ navigation, route }) => {
  const [images, setImages] = useState(route.params.images || []);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  const deleteHandler = async (imageId) => {
    try {
      await dispatch(deleteProductImage(productId, imageId));
      setImages(images.filter(img => img._id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const submitHandler = async () => {
    const myForm = new FormData();
  
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });
  
    try {
      // Dispatch the action to update the product image
      await dispatch(updateProductImage(productId, myForm));
  
      // Assuming the updateProductImage action returns the updated images array
      const updatedImages = [...images, { _id: 'new_image_id', url: image }];
      
      // Update the images state with the updated images
      setImages(updatedImages);
  
      // Reset the image and imageChanged state
      setImage(null);
      setImageChanged(false);
    } catch (error) {
      console.error("Error updating product image:", error);
    }
  };
  

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
      setImageChanged(true);
    }
  }, [route.params]);

  return (
    <View
      style={{
        ...defaultStyle,
      }}
    >
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 15 }}>
        <Text style={formHeading}>Images</Text>
      </View>

      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 40,
            minHeight: 400,
          }}
        >
          {images.map((i) => (
            <ImageCard
              key={i._id}
              src={i.url}
              id={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.color3,
        }}
      >
        <Image
          style={{
            backgroundColor: colors.color2,
            width: 100,
            height: 100,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{ uri: image }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("camera", { updateProduct: true })
            }
          >
            <Avatar.Icon
              icon={"camera"}
              style={{
                backgroundColor: colors.color2,
                margin: 10,
              }}
              size={30}
              color={colors.color3}
            />
          </TouchableOpacity>
        </View>

        <Button
          style={{
            backgroundColor: "white",
            margin: 20,
            padding: 6,
            borderRadius: 5,
          }}
          textColor={"black"}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default ProductImages;
