import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { commentReducer } from "./reducers/commentReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { chatReducer } from "./reducers/chatReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    product: productReducer,
    cart: cartReducer,
    comment: commentReducer,
    wishlist: wishlistReducer,
    chat: chatReducer
  },
});
//Deployed server
export const server = "https://aroma-backend-rmag.onrender.com/api/v1"

//Home IP
// export const server = "http://192.168.254.157:5000/api/v1"

//Kapehan IP
// export const server = "http://192.168.0.183:5000/api/v1"

//Bahay ni wanel IP
// export const server = "http://192.168.254.157:5000/api/v1"

//Hotspot ko
//export const server = "http://192.168.124.139:5000/api/v1"

//bahay ni ej IP 5g
// export const server = "http://192.168.100.63:5000/api/v1"

// aybi hatspat
// export const server = "http://192.168.43.185:5000/api/v1"

//hotspot ni ej
// export const server = "http://192.168.65.54:5000/api/v1"


//bahay ni ej IP 2.4g
// export const server = "http://192.168.100.63:5000/api/v1"
