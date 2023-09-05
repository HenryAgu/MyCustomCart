import { createSlice } from "@reduxjs/toolkit";
// json data
import { ItemsData } from "../ItemList";

const initialState = {
  value: ItemsData,
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
    updateItem: (state, action) => {
      state.value.map((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.item;
        }
      });
    },
    updatePrice: (state, action) => {
      state.value.map((item) => {
        if (item.id === action.payload.id) {
          item.price = action.payload.price;
        }
      });
    },
  },
});


export default itemSlice.reducer;
export const { addItem, deleteItem, updateItem, updatePrice } =
  itemSlice.actions;
