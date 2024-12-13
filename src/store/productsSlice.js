import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
        addToCart: (state, action) => {
            const newProduct = action.payload
            state.products = [newProduct, ...state.products]
        },
        deleteFromCart: (state, action) => {
            const id = action.payload
            state.products = state.products.filter((product) => product.id !== id)
        }
    }
})

export const { addToCart, deleteFromCart } = productsSlice.actions
export default productsSlice.reducer

function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        const existingItem = state.find((item) => item.id === action.payload.id);
        if (existingItem) {
          return state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...state, { ...action.payload, quantity: 1 }];
  
      case "REMOVE_FROM_CART":
        return state.filter((item) => item.id !== action.payload);
  
      case "UPDATE_QUANTITY":
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
  
      default:
        return state;
    }
  }