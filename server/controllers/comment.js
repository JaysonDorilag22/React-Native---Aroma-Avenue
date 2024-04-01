import { Comment } from "../models/comment.js";
import { Order } from "../models/order.js";
import { User } from "../models/user.js";
import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js";

// Get all comments
export const getAllComments = async (req, res, next) => {
  try {
    const productId = req.params.productId; // Assuming product ID is passed as a parameter

    // Find all comments related to the specified product ID and populate the 'user' field with 'name'
    const comments = await Comment.find({ product: productId }).populate({
      path: 'user',
      select: 'name', // Specify the fields you want to select from the user document
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Add a new comment
export const addComment = asyncError(async (req, res, next) => {
  try {
    console.log("Starting addComment function...");

    const { text, productId, userId, rating } = req.body;

    console.log("Received request body:", req.body);

    // Check if the user has ordered and received the product
    const userOrder = await Order.findOne({
      "orderItems.product": productId,
      user: userId,
      "orderStatus": "Delivered",
    });

    if (!userOrder) {
      console.log("User order not found or product not delivered.");
      return res.status(400).json({
        success: false,
        message: "You can only comment on delivered products",
      });
    }

    console.log("User order found:", userOrder);

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found.");
      return res.status(400).json({ success: false, message: "User not found" });
    }

    console.log("User found:", user);

    // Ensure the user's comment list is set up
    if (!user.comments) {
      user.comments = [];
    }

    // Check if the user has already commented
    const existingComment = await Comment.findOne({
      user: userId,
      product: productId,
    });

    if (existingComment) {
      console.log("Existing comment found:", existingComment);
      // If the user has already commented, update the existing comment
      existingComment.text = text;
      existingComment.rating = rating;

      await existingComment.save();

      console.log("Existing comment updated.");
      
      return res.status(200).json({
        success: true,
        message: "Comment Updated Successfully",
      });
    }

    console.log("No existing comment found.");

    // Create a new comment
    const newComment = await Comment.create({
      text,
      product: productId,
      user: userId,
      rating,
    });

    await newComment.save();

    console.log("New comment created:", newComment);

    user.comments.push(newComment);
    await user.save();

    console.log("User comments updated.");

    res.status(200).json({
      success: true,
      message: "Commented Successfully",
    });
  } catch (error) {
    console.error("Error in addComment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});


// Delete a comment
export const deleteComment = asyncError(async (req, res, next) => {
  try {
    const commentId = req.params.id; 
    const userId = req.user.id; 

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.user.toString() !== userId && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this comment" });
    }

    await comment.deleteOne();

    if (req.user.role !== 'admin') {
      const user = await User.findById(userId);
      if (user) {
        user.comments = user.comments.filter(comment => comment.toString() !== commentId);
        await user.save();
      }
    }

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export const getProductRatings = asyncError(async (req, res, next) => {
  try {
    const productId = req.params.productId; 

    const comments = await Comment.find({ product: productId });

    if (comments.length === 0) {
      return res.status(404).json({ success: false, message: "No ratings found for this product" });
    }

    let totalRating = 0;
    comments.forEach(comment => {
      totalRating += comment.rating;
    });
    const averageRating = totalRating / comments.length;

    res.status(200).json({ success: true, averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});