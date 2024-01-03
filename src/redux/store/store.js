import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import filterSlice from '../modules/filterSlice';

// const rootReducer = combineReducers({ // tookit 아닌 일반 리듀서 사용 시
//   filterSlice
//   // 다른 리듀서들 추가
// })

const store = configureStore({ 
    // reducer: rootReducer,
    reducer: { filterSlice },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  });

export default store;