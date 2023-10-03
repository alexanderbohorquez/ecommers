import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading';


export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    }
})

export const newThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
}

export const getProductsThunk = () => (dispatch) => {

    dispatch(setIsLoading(true))

    axios
        .get('http://localhost:8080/products')
        .then((resp) => dispatch(setProducts(resp.data)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}


export const filterProductsByCategoryThunk = (id) => dispatch => {

    dispatch(setIsLoading(true))

    axios
        .get(`https://ecommers-app-zbyz.onrender.com/products/${id}`)
        .then((resp) => dispatch(setProducts(resp.data)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
