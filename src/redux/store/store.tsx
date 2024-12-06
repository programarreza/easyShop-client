import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Internal imports
import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "auth", // The key in local storage where the auth state is saved
  storage, // Define the storage method (local storage)
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];

// Destructure to get the store and persistor
const { store, persistor } = makeStore();

export { persistor, store };
