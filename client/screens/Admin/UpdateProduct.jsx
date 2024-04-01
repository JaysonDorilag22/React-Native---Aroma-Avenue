import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import { updateProduct } from "../../redux/actions/otherActions";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import SelectComponent from "../../components/SelectComponent";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Carousel from "react-native-snap-carousel"; // Import the Carousel component
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const UpdateProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { product, loading } = useSelector((state) => state.product);

  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    dispatch(updateProduct(id, name, description, price, stock, categoryID));
  };

  const loadingOther = useMessageAndErrorOther(
    dispatch,
    navigation,
    "adminpanel"
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, isFocused]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category?.category);
      setCategoryID(product.category?._id);
    }
  }, [product]);

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
        <View style={{ marginBottom: 15, paddingTop: 15 }}>
          <Text style={formHeading}>Update Product</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                // height: 1000,
              }}
            >
              {/* Manage Images Button */}

              {/* Render carousel for images */}
              {/* // Render carousel for images */}
              <View style={{ alignItems: "center" }}>
                <Carousel
                  data={product.images}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={{ uri: item.url }} // Assuming each item in product.images has a 'url' property
                        style={{ width: screenWidth, height: 200 }}
                      />
                    </View>
                  )}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth}
                />
              </View>

              <Button
              style={{
                  backgroundColor: "white",
                  margin: 20,
                  padding: 6,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "black"
                }}
                onPress={() =>
                  navigation.navigate("productimages", {
                    id,
                    images: product.images,
                  })
                }
                textColor={"black"}
              >
                Manage Images
              </Button>

              {/* Name */}
              <Text style={{ marginLeft: 20 }}>Name</Text>
              <TextInput
                {...inputOptions}
                value={name}
                onChangeText={setName}
              />

              {/* Description */}
              <Text style={{ marginLeft: 20 }}>Description</Text>
              <TextInput
                {...inputOptions}
                value={description}
                onChangeText={setDescription}
              />

              {/* Price */}
              <Text style={{ marginLeft: 20 }}>Price</Text>
              <TextInput
                {...inputOptions}
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
              />

              {/* Stock */}
              <Text style={{ marginLeft: 20 }}>Stock</Text>
              <TextInput
                {...inputOptions}
                value={stock}
                keyboardType="number-pad"
                onChangeText={setStock}
              />

              {/* Category */}
              <Text style={{ marginLeft: 20 }}>Category</Text>
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

              {/* Update Button */}
              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: "black",
                  margin: 20,
                  padding: 6,
                  borderRadius: 5,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
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

export default UpdateProduct;
