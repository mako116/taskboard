import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";

import tasksReducer from "./slices/taskSlice";
import usersReducer from "./slices/usersSlice";
import filtersReducer from "./slices/filtersSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
  filters: filtersReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "taskflow",
  version: 1,
  storage,
  whitelist: ["tasks", "filters", "ui"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
