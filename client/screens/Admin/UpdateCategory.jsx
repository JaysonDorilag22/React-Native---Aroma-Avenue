import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, getCategoryDetails } from "../../redux/actions/otherActions";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { colors, defaultStyle, formHeading, inputOptions } from "../../styles/styles";
import Carousel from "react-native-snap-carousel"; // Import the Carousel component
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const UpdateCategory = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [id] = useState(route.params.id);
  const [loading, setLoading] = useState(false);
  const [category, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getCategoryDetails(id));
      } catch (error) {
        console.error("Error fetching category details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id, isFocused]);

  const { category: categoryDetails } = useSelector(state => state.other);

  const submitHandler = () => {
    dispatch(updateCategory(id, category));
  };

  useEffect(() => {
    if (categoryDetails) {
      setCategoryName(categoryDetails.category);
    }
  }, [categoryDetails]);

  const handleCategoryChange = (newCategory) => {
    setCategoryName(newCategory);
  };

  return (
    <>
      <View
        style={{
          ...defaultStyle,
        }}
      >
        <Header back={true} />

        {/* Heading */}
        <View style={{ marginBottom: 15, paddingTop: 15 }}>

          <Text style={formHeading}>Update Category</Text>
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
                height: 650,
              }}
            >
            <View style={{ alignItems: "center" }}>
                <Carousel
                  data={categoryDetails.images}
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
                  navigation.navigate("categoryimages", {
                    id,
                    images: categoryDetails.images,
                  })
                }
                textColor={"black"}

                disabled={loading}
              >
                Manage Images
              </Button>

              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={category}
                onChangeText={handleCategoryChange} 
              />

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: "black",
                  margin: 20,
                  padding: 6,
                  borderRadius: 5,
                }}
                onPress={submitHandler}
                loading={loading}
                disabled={loading}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default UpdateCategory;
