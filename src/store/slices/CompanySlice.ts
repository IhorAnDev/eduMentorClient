import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '@/types';

const initialState: Company = {
  companyId: 0,
  companyName: '',
  ownerId: 0,
  companyCourses: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(state, action: PayloadAction<Company>) {
      return action.payload;
    },
    updateCompany(state, action: PayloadAction<Partial<Company>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCompany, updateCompany } = companySlice.actions;
export default companySlice.reducer;
