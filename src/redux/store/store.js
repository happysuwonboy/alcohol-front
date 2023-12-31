import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from '../filter_modules/filterSlice';

const store = configureStore({ 
    reducer: { filtersSlice }
  });

export default store;