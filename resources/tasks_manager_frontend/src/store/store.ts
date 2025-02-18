import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "@/store/slices/taskSlice";
import categoryReducer from "@/store/slices/categorySlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;