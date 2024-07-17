import { combineReducers, configureStore } from "@reduxjs/toolkit";
import diskSlice from './disk/slice';

const rootReducer = combineReducers({
disk:diskSlice,
})

const store = configureStore({
    reducer:
      rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });



export default store