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
    .get('https://ecommers-app-zbyz.onrender.com/carts', getConfig())
    .then(resp => dispatch(setFavorites(resp.data)))
    .catch(error => console.error(error))
    .finally (() => dispatch(setIsLoading(false)))
}


export const addProductThunk = (data) => dispatch => {
    dispatch(setIsLoading(true))
    axios
    .post ("https://ecommers-app-zbyz.onrender.com/carts", data, getConfig())
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
        .put(`https://ecommers-app-zbyz.onrender.com/carts/${id}`, body, getConfig())
        .then(() => dispatch (getFavoritesThunk() ))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
    }


export const purchaseCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios
    .post("https://ecommers-app-zbyz.onrender.com/purchases", {}, getConfig())
    .then(() => dispatch(getFavoritesThunk()))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setFavorites  } = favoriteSlice.actions;

export default favoriteSlice.reducer;
