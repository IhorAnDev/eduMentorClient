import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    startRefreshing(state) {
      state.isRefreshing = true;
    },
    stopRefreshing(state) {
      state.isRefreshing = false;
    },
  },
});

export const { setTokens, startRefreshing, stopRefreshing } = authSlice.actions;
export default authSlice.reducer;
