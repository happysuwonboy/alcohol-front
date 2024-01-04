import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import filterSlice from '../modules/filterSlice';

const store = configureStore({ 
    reducer: { filterSlice },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  });

export default store;