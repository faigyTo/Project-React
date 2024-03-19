import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../features/orders/orderSlice";
import useSlice from "../features/users/useSlice";

export const store = configureStore({
    reducer:{
        order:orderSlice,user:useSlice
    }
})
