import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import {usersReducer} from '../feauters/users/UsersSlice';
import {itemsReducer} from '../feauters/items/itemsSlice';

const usersPersisConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersisConfig, usersReducer),
  items: itemsReducer,
});
``
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;