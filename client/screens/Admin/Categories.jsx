import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"; // import useSelector
import mime from "mime";
import { addCategory, deleteCategory, getAllCategories } from "../../redux/actions/otherActions";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Header from "../../components/Header";
import { useMessageAndErrorOther } from "../../utils/hooks";

const Categories = ({ navigation, route }) => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const categories = useSelector((state) => state.other.categories); // Use useSelector

  const isFocused = useIsFocused();
  const dispatch = useDispatch();


  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  const fetchCategories = async () => {
    try {
      await dispatch(getAllCategories());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteCategory(id));
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const submitHandler = async () => {
    const myForm = new FormData();
    myForm.append("category", category);
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });

    try {
      await dispatch(addCategory(myForm));
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  return (
    <View style={{ ...defaultStyle }}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 25 }}>
        <Text style={formHeading}>Categories</Text>
      </View>

      <ScrollView style={{ marginBottom: 20 }}>
        <View style={{ backgroundColor: colors.color2, padding: 20, minHeight: 400 }}>
          {categories.map((i) => (
            <CategoryCard
              name={i.category}
              id={i._id}
              key={i._id}
              deleteHandler={deleteHandler}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>

      {/* add category form */}
      <View style={styles.container}>
        <View
          style={{
            width: 80,
            height: 60,
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
            onPress={() => navigation.navigate("camera", { newCategory: true })}
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

        <TextInput
          {...inputOptions}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <Button
          textColor={colors.color3}
          activeOpacity={0.8}
          style={{
            backgroundColor: "white",
            margin: 20,
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            borderWidth: 1,
            borderColor: colors.color3,
          }}
          loading={loading}
          disabled={!category}
          onPress={submitHandler}
        >
          Add
        </Button>
      </View>
      {/* add category form */}
    </View>
  );
};

const CategoryCard = ({ name, id, deleteHandler, navigation }) => (
  <View style={styles.cardContainer}>
    <View style={styles.cardInfo}>
      <Text style={styles.cardText}>{name}</Text>
    </View>
    <View style={styles.cardActions}>
      <TouchableOpacity onPress={() => deleteHandler(id)}>
        <Avatar.Icon
          icon={"delete"}
          size={30}
          style={{ backgroundColor: colors.color1 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation && navigation.navigate("updatecategory", { id })}>
        <Avatar.Icon
          icon={"pen"}
          size={30}
          style={{ backgroundColor: colors.color1 }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 20,
  },
  cardContainer: {
    backgroundColor: colors.color2,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardActions: {
    flexDirection: "row",
  },
});

export default Categories;
