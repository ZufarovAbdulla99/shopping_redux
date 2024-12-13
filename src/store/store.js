import { configureStore } from "@reduxjs/toolkit"
import productsSlice from "./productsSlice"

export default configureStore({
    reducer: {
        products: productsSlice
    }
})