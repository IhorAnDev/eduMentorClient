import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '@/store/slices/CompanySlice';
import sidebarReducer from '@/store/slices/SidebarSlice';
import authReducer from '@/store/slices/AuthSlice';


export const store = configureStore({
  reducer: {
    company: companyReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { posts: PostsState, comments: CommentsState, users: UsersState }
export type AppDispatch = typeof store.dispatch;
