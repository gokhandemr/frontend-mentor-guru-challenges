import {configureStore} from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import sidebarReducer from "./slices/sidebarSlice";
import darkThemeReducer from "./slices/themeSlice";
import popupsReducer from "./slices/popupsSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    sidebar: sidebarReducer,
    darkTheme: darkThemeReducer,
    popups: popupsReducer,
  },
});
