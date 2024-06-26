'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens } from '@/store/slices/AuthSlice';

const TokenHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRefreshTokens = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (data.success) {
          const accessToken = data.token;
          const refreshToken = data.refreshToken;

          if (accessToken && refreshToken) {
            dispatch(setTokens({ accessToken, refreshToken }));
          }
        } else {
          console.error('Failed to refresh token:', data.message);
        }
      } catch (error) {
        console.error('Error refreshing tokens:', error);
      }
    };

    handleRefreshTokens();
  }, [dispatch]);

  return null;
};

export default TokenHandler;
