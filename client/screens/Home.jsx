import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions";
import { useSetCategories } from "../utils/hooks";
import Carousel from 'react-native-snap-carousel';
import slide1 from '../assets/carousel/slide1.png';
import slide2 from '../assets/carousel/slide2.png';
import slide3 from '../assets/carousel/slide3.png';
import slide4 from '../assets/carousel/slide4.png';
import slide5 from '../assets/carousel/slide5.png';
import Header from "../components/Header";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { defaultStyle, colors } from "../styles/styles";

const Home = () => {
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCardHandler = (id, name, price, image, stock) => {
    if (!user) {
      navigate.navigate("login");
      return;
    }
    if (stock === 0)
      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });

    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });

    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  const addToWishlistHandler = (id, name, price, image, stock) => {
    if (!user) {
      navigate.navigate("login"); 
      return;
    }
    dispatch({
      type: "addToWishlist",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
      },
    });

    Toast.show({
      type: "success",
      text1: "Added To Wishlist",
    });
  };

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 200);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  useEffect(() => {
    const carouselData = [
      { title: slide1 },
      { title: slide2 },
      { title: slide3 },
      { title: slide4 },
      { title: slide5 },
    ];
    setCarouselItems(carouselData);
  }, []);

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item.title} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}
      <View style={defaultStyle}>
        {/* <Header /> */}

        {/* Heading Row*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <Heading style={{ marginLeft: 10 }} />

          {/* Search bar */}

          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                size={50}
                color={"black"}
                style={{ backgroundColor: colors.color2 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carousel */}
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={350}
          itemWidth={350}
          autoplay={true}
          loop={true}
        />

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            height: 50,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 5,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color2 : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={{ flex: 20 }}>
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {products.map((item, index) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => navigateToProductDetails(item._id)}
                style={{ flexBasis: "50%" }}
              >
                <ProductCard
                  stock={item.stock}
                  name={item.name}
                  price={item.price}
                  image={item.images[0]?.url}
                  addToCardHandler={addToCardHandler}
                  addToWishlistHandler={addToWishlistHandler}
                  id={item._id}
                  key={item._id}
                  i={index}
                  navigate={navigate}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute={"home"} />
    </>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    borderRadius: 5,
    padding: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});

export default Home;
