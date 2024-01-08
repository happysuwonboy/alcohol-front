import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../constants/baseurl';

export const fetchCartCount = createAsyncThunk('cartCount/fetchCartCount', async (user_id) => {
    const response = await axios.get(`${BASE_URL}/cart/${user_id}`)
    return response.data.length
})


const cartCountSlice = createSlice({
    name: 'cartCount',
    initialState: {
        count : 0,
        loading : 'loading'
    },
    reducers: {
        addCartCount: (state, action) => {state.count  += action.payload.addCount},
        subCartCount: (state, action) => {state.count  -= action.payload.subCount}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartCount.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchCartCount.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.count = action.payload;
            })
            .addCase(fetchCartCount.rejected, (state) => {
                state.loading = 'failed';
            });
    }
})


export default cartCountSlice.reducer;
export const { addCartCount, subCartCount } = cartCountSlice.actions; 