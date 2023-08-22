import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'postFavourites', // Уникальный ключ для сохранения в localStorage
    storage,
};

export const postFavouritesPersistConfig = (reducer) =>
    persistReducer(persistConfig, reducer);