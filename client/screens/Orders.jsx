// Orders.js
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { colors, defaultStyle, formHeading } from "../styles/styles";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { Headline, Avatar, Badge } from "react-native-paper"; // Import Badge
import OrderItem from "../components/OrderItem";
import { useGetOrders } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import Footer from "../components/Footer";

const Orders = () => {
  const isFocused = useIsFocused();
  const { loading, orders } = useGetOrders(isFocused);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Function to filter orders based on delivery status
  const filterOrdersByStatus = (status) => {
    return orders.filter((item) => item.orderStatus === status);
  };

  // Function to count orders based on status
  const countOrdersByStatus = (status) => {
    return orders.filter((item) => item.orderStatus === status).length;
  };

  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 30 }}>
        <Text style={formHeading}>Orders</Text>
      </View>

      {/* Badges indicating order count */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setSelectedStatus("Preparing")} style={{ marginRight: 10 }}>
          <View>
            <Avatar.Icon size={40} icon="package" style={{ backgroundColor: "black", borderRadius: 5 }} />
            <Badge
              visible={countOrdersByStatus("Preparing") > 0}
              style={{ backgroundColor: "red", position: "absolute", top: -5, right: -5 }}
            >
              {countOrdersByStatus("Preparing")}
            </Badge>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedStatus("Shipped")} style={{ marginRight: 10 }}>
          <View>
            <Avatar.Icon size={40} icon="truck" style={{ backgroundColor: "black", borderRadius: 5 }} />
            <Badge
              visible={countOrdersByStatus("Shipped") > 0}
              style={{ backgroundColor: "orange", position: "absolute", top: -5, right: -5 }}
            >
              {countOrdersByStatus("Shipped")}
            </Badge>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedStatus("Delivered")}>
          <View>
            <Avatar.Icon size={40} icon="check" style={{ backgroundColor: "black", borderRadius: 5 }} />
            <Badge
              visible={countOrdersByStatus("Delivered") > 0}
              style={{ backgroundColor: "green", position: "absolute", top: -5, right: -5 }}
            >
              {countOrdersByStatus("Delivered")}
            </Badge>
          </View>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 5,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Displaying filtered orders based on selected status */}
            {selectedStatus ? (
              filterOrdersByStatus(selectedStatus).map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderedOn={item.createdAt.split("T")[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                />
              ))
            ) : (
              // Displaying all orders if no status is selected
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderedOn={item.createdAt.split("T")[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                />
              ))
            )}
          </ScrollView>
        </View>
      )}
      <Footer activeRoute={"home"} />

    </View>
  );
};

export default Orders;
