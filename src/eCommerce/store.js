import { configureStore } from "@reduxjs/toolkit";
import reducer from "./globState";

export const store = configureStore({
  reducer: { reducer },
});
