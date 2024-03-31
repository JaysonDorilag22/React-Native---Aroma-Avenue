import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { deleteProduct } from "../../redux/actions/otherActions";
import { getAdminProducts } from "../../redux/actions/productActions";
import { getAllCategories } from "../../redux/actions/otherActions";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import AdminButtonBox from "../../components/AdminButtonBox";
import ProductListHeading from "../../components/ProductListHeading";
import ProductListItem from "../../components/ProductListItem";

const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { products } = useSelector((state) => state.product);

  // const { category } = useSelector((state) => state.otherReducer.category);
  // console.log(categories)

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllCategories());
  }, [dispatch, isFocused]);

  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Analytics":
        navigation.navigate("analytics");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;
      default:
        navigation.navigate("allusers");
        break;
    }
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAdminProducts());
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 40, marginBottom: 20 }}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>

      <View>
        {/* Row with All Orders, Analytics, and All Users */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          <AdminButtonBox
            icon={"format-list-bulleted-square"}
            text={"All Orders"}
            handler={navigationHandler}
            reverse={true}
          />
          <AdminButtonBox
            icon={"graph-outline"}
            text={"Analytics"}
            handler={navigationHandler}
            reverse={true}
          />
          <AdminButtonBox
            icon={"account-outline"}
            text={"All Users"}
            handler={navigationHandler}
            reverse={true}
          />
        </View>

        {/* Row with Product and Category */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          <AdminButtonBox
            icon={"folder-outline"}
            text={"Product"}
            handler={navigationHandler}
          />
          <AdminButtonBox
            icon={"label-outline"}
            text={"Category"}
            handler={navigationHandler}
          />
        </View>
      </View>

      <ProductListHeading />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {products.map((item, index) => (
            <ProductListItem
              navigate={navigation}
              deleteHandler={deleteProductHandler}
              key={item._id}
              id={item._id}
              i={index}
              price={item.price}
              stock={item.stock}
              name={item.name}
              // category={categories.find(cat => cat._id === item.category)?.name} // Assuming category IDs are stored in products and category names are stored in categories
              imgSrc={item.images[0].url}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminPanel;
