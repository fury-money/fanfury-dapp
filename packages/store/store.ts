import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer, REHYDRATE } from "redux-persist";

import { persistConfig } from "./config";
import { dAppsReducer, dAppsReducerPersisted } from "./slices/dapps-store";
import {
  marketplaceCartItems,
  marketplaceCartItemsUI,
} from "./slices/marketplaceCartItems";
import {
  marketplaceFilters,
  marketplaceFilterUI,
} from "./slices/marketplaceFilters";
import { messageReducer } from "./slices/message";
import { notificationReducer } from "./slices/notification";
import { searchReducer } from "./slices/search";
import { settingsReducer } from "./slices/settings";
import { squadPresetsReducer } from "./slices/squadPresets";
import { walletsReducer } from "./slices/wallets";
import { bootWeshModule } from "../weshnet/client/services";

const rootReducer = combineReducers({
  wallets: walletsReducer,
  settings: settingsReducer,
  squadPresets: squadPresetsReducer,
  dAppsStorePersisted: dAppsReducerPersisted,
  dAppsStore: dAppsReducer,
  marketplaceCartItems,
  marketplaceCartItemsUI,
  marketplaceFilters,
  marketplaceFilterUI,
  search: searchReducer,
  message: messageReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createRehydrateRootReducer = (reducer) => (state, action) => {
  if (action.type === REHYDRATE) {
    console.log("rehydrated");
    bootWeshModule();
  }
  return reducer(state, action);
};

export const store = configureStore({
  reducer: createRehydrateRootReducer(persistedReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store, null);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
