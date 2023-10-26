import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { keys } from '~/common';
import { allReducer } from './slices';
import {
    cart,
    categories,
    orderHistory,
    products,
    reviews,
    search,
} from './variables';

const persistConfig = {
    key: keys.persist,
    storage,
    blacklist: [
        cart.name,
        categories.name,
        orderHistory.name,
        products.name,
        search.name,
        reviews.name,
    ],
};
const rootReducer = combineReducers(allReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);
