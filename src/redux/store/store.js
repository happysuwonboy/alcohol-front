import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import filterSlice from '../modules/filterSlice';
import cartCountSlice from '../modules/cartCountSlice';

const store = configureStore({ 
    reducer: { filterSlice, cartCountSlice },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  });

export default store;