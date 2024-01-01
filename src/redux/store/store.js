import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../filter_modules/filterSlice';

const store = configureStore({ 
    reducer: { filterSlice }
  });

export default store;