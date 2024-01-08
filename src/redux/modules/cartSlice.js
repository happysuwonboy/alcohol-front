import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartCount = createSlice({
    name : 'cartCount',
    initialState : 0,
    reducers : {
        addCartCount : (state, action) => state = state + action.addCount,
        subCartCount : (state, action) => state = state - action.subCount
    }
})