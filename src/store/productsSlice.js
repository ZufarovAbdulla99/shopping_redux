import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      state.products = [newProduct, ...state.products];
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
    updateProductQuantity: (state, action) => {
      // console.log(action.payload.id);
      // console.log(action.payload.quantity);

      // // other way 
      // state.products = state.products.map((product) => {
      //   if(product.id === action.payload.id){
      //     return { ...product, quantity : action.payload.quantity }
      //   }else {
      //     return product
      //   }
      // })
      if(action.payload.quantity > 0) {
        state.products = state.products.map((product) => product.id === action.payload.id ? { ...product, quantity : action.payload.quantity } : product)
      }
    },
  },
});

export const { addToCart, deleteFromCart, updateProductQuantity } =
  productsSlice.actions;
export default productsSlice.reducer;

// const updateQuantity = (productId, quantity) => {
//   if (quantity > 0) {
//     dispatch({
//       type: "UPDATE_QUANTITY",
//       payload: { id: productId, quantity },
//     });
//   }
// };
