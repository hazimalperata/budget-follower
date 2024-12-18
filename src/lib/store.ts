import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import {PersistableStore} from "@/types/store";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {transactionReducer} from "@/lib/features/transactions/transactionSlice";
import {categoryReducer} from "@/lib/features/categories/categorySlice";
import {navbarReducer} from "@/lib/features/navbar/navbarSlice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const persistConfig = {
  key: 'persist',
  storage,
}

const rootReducer = combineReducers({
  categoryReducer,
  transactionReducer,
  navbarReducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  })

export const makeStore: () => PersistableStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return (makeConfiguredStore() as PersistableStore)
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}),
    }) as PersistableStore;
    store.__persistor = persistStore(store)
    return store
  }
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch']
