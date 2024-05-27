import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  hover: boolean;
}

const initialState: SidebarState = {
  hover: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setHover(state, action: PayloadAction<boolean>) {
      state.hover = action.payload;
    },
  },
});

export const { setHover } = sidebarSlice.actions;
export default sidebarSlice.reducer;
