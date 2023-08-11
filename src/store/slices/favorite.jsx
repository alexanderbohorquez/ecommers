import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading';

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: [],
    reducers: {
        setFavorites: (state, action) => {
            return action.payload
        }
    }
})

export const getFavoritesThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
    .get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
    .then(resp => dispatch(setFavorites(resp.data)))
    .catch(error => console.error(error))
    .finally (() => dispatch(setIsLoading(false)))
}


export const addProductThunk = (data) => dispatch => {
    dispatch(setIsLoading(true))
    axios
    .post ("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
    .then (resp => dispatch(getFavoritesThunk()))
    .catch(error => console.error(error))
    .finally (() => dispatch(setIsLoading(false)))
}

export const updateFavoriteThunk = (id, newRate) => 
    dispatch => {
        dispatch(setIsLoading(true))

        const body = {
            quantity : newRate
        }

        axios
        .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
        .then(() => dispatch (getFavoritesThunk() ))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
    }


export const purchaseCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios
    .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {}, getConfig())
    .then(() => dispatch(getFavoritesThunk()))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setFavorites  } = favoriteSlice.actions;

export default favoriteSlice.reducer;
