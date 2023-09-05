import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/Items";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
