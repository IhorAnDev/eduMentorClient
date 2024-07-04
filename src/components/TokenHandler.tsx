'use client';
import { useEffect } from 'react';
import {
  setTokens,
  startRefreshing,
  stopRefreshing,
} from '@/store/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ONE_HOUR_IN_MS = 60 * 1000;

const TokenHandler = () => {
  const dispatch = useDispatch();
  const { accessTokenExpiry, isRefreshing } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const handleRefreshTokens = async () => {
      const lastRefreshTime = localStorage.getItem('lastRefreshTime');
      const now = Date.now();

      if (
        lastRefreshTime &&
        now - parseInt(lastRefreshTime, 10) < ONE_HOUR_IN_MS
      ) {
        return;
      }

      if (!accessTokenExpiry || now > accessTokenExpiry) {
        if (isRefreshing) {
          return;
        }

        dispatch(startRefreshing());

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
            const accessTokenExpiry = data.tokenExp;

            if (accessToken && refreshToken) {
              dispatch(
                setTokens({ accessToken, refreshToken, accessTokenExpiry })
              );
              localStorage.setItem('lastRefreshTime', now.toString());
            }
          } else {
            console.error(
              'Failed to refresh token:',
              data.message || data.error
            );
          }
        } catch (error) {
          console.error('Error refreshing tokens:', error);
        } finally {
          dispatch(stopRefreshing());
        }
      }
    };

    handleRefreshTokens();
  }, [dispatch, accessTokenExpiry, isRefreshing]);

  return null;
};

export default TokenHandler;
