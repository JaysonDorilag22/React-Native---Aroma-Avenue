import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "react-native-ratings";
import Toast from "react-native-toast-message";
import {
  addComment,
  getAllComments,
  getProductRatings,
} from "../redux/actions/commentActions";
import { useGetOrders } from "../utils/hooks";

const Comment = () => {
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [text, setNewCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch user's orders using the custom hook
  const { orders, loading: ordersLoading, error: ordersError } = useGetOrders(user.user._id);
console.log(orders)
  useEffect(() => {
    // If orders are successfully fetched and product ID is available, fetch comments and ratings
    if (orders && orders.length > 0 && product.product._id) {
      dispatch(getAllComments(product.product._id));
      dispatch(getProductRatings(product.product._id));
    }
  }, [dispatch, orders, product.product._id]);

  useEffect(() => {
    // Handle errors while fetching orders
    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      // Handle error state accordingly
    }
  }, [ordersError]);

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleAddComment = () => {
    console.log("Starting handleAddComment function...");

    if (!text) {
        console.log("No text provided for comment.");
        showToast("error", "Please enter a comment.");
        return;
    }

    console.log("Text provided for comment:", text);

    setIsLoading(true);

    // Check if the user has ordered the product
    const hasOrderedProduct = orders.some(order => order.orderStatus === "Delivered");

    if (!hasOrderedProduct) {
        showToast("error", "You can only comment on delivered products.");
        setIsLoading(false);
        return;
    }

    dispatch(addComment(text, user.user._id, product.product._id, rating))
        .then(() => {
            console.log("Comment added successfully!");
            setNewCommentText("");
            setRating(0);
            showToast("success", "Comment added successfully");
            dispatch(getAllComments(product.product._id));
            dispatch(getProductRatings(product.product._id));
        })
        .catch((error) => {
            console.error("Error adding comment:", error);
            showToast("error", "Failed to add comment");
        })
        .finally(() => {
            console.log("Finally block executed.");
            setIsLoading(false);
        });
};


  return (
    <View style={styles.container}>
      <View>
        <Rating
          showRating
          reviewSize={10}
          startingValue={rating}
          imageSize={20}
          onFinishRating={(value) => setRating(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={text}
          onChangeText={setNewCommentText}
        />
        <View>
          <TouchableOpacity onPress={handleAddComment} disabled={isLoading}>
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 4,
                borderWidth: 1,
                borderColor: "black",
              }}
              textColor={"black"}
            >
              Add Comment
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: "white",
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    marginRight: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: "100%",
  },
});

export default Comment;
