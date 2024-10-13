import { combineReducers, configureStore } from '@reduxjs/toolkit';
import diskSlice from './disk/slice';
import { yandexApi } from './yandex';
import { resourcesSlice, resourcesMiddleware } from './resources';

const rootReducer = combineReducers({
  disk: diskSlice,
  [yandexApi.reducerPath]: yandexApi.reducer,
  [resourcesSlice.reducerPath]: resourcesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(yandexApi.middleware).concat(resourcesMiddleware),
});
