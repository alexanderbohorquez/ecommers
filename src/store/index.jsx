import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading'
import products from './slices/products'
import favorite from './slices/favorite'

export default configureStore({
    reducer: {
        isLoading,
        products,
        favorite
    }
})
