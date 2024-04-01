import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from "../../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";
import { useSetCategories, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { createProduct } from "../../redux/actions/otherActions";

const NewProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Choose Category");
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const disableBtnCondition =
    !name || !description || !price || !stock || !image;

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("stock", stock);
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });

    if (categoryID) myForm.append("category", categoryID);

    dispatch(createProduct(myForm))
      .then(() => {
        // Clear all input fields upon successful submission
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategory("Choose Category");
        setImage("");
      })
      .catch((error) => {
        // Handle error if necessary
        console.error("Error creating product:", error);
      });
  };

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  return (
    <>
      <View
        style={{
          ...defaultStyle,
          // backgroundColor: colors.color5,
        }}
      >
        <Header back={true} />

        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 15 }}>
          <Text style={formHeading}>New Product</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              height: 600,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              <Avatar.Image
                size={80}
                style={{
                  backgroundColor: colors.color1,
                }}
                source={{
                  uri: image ? image : null,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { newProduct: true })
                }
              >
                <Avatar.Icon
                  icon={"camera"}
                  size={30}
                  color={colors.color3}
                  style={{
                    backgroundColor: colors.color2,
                    position: "absolute",
                    bottom: 0,
                    right: -5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ marginLeft: 20 }}>Name</Text>

            <TextInput {...inputOptions} value={name} onChangeText={setName} />
            <Text style={{ marginLeft: 20 }}>Description</Text>

            <TextInput
              {...inputOptions}
              value={description}
              onChangeText={setDescription}
            />
            <Text style={{ marginLeft: 20 }}>Price</Text>

            <TextInput
              {...inputOptions}
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
            />
            <Text style={{ marginLeft: 20 }}>Stock</Text>

            <TextInput
              {...inputOptions}
              keyboardType="number-pad"
              value={stock}
              onChangeText={setStock}
            />

            <Text
              style={{
                backgroundColor: "white",
                margin: 20,
                padding: 10,
                borderRadius: 5,
                fontSize: 12,
                borderWidth: 1,
                borderColor: colors.color3,
              }}
              onPress={() => setVisible(true)}
            >
              {category}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: "black",
                margin: 20,
                padding: 10,
                borderRadius: 5,
                fontSize: 12,
                borderWidth: 1,
                borderColor: colors.color3,
              }}
              onPress={submitHandler}
              disabled={loading || disableBtnCondition}
            >
              {/* Render either 'Create' text or ActivityIndicator based on loading state */}
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{ color: "white", textAlign: "center" }}>
                  Create
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <SelectComponent
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default NewProduct;
