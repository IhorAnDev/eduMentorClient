import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isRefreshing: boolean;
  accessTokenExpiry: number | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isRefreshing: false,
  accessTokenExpiry: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        accessTokenExpiry: number;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.accessTokenExpiry = action.payload.accessTokenExpiry;
      state.isRefreshing = false;
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
