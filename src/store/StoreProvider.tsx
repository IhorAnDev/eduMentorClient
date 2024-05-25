'use client';
import { store } from './store';
import { Provider } from 'react-redux';

// Generate tests for the below variable
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
