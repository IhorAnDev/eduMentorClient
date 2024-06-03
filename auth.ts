import { cookies, headers } from 'next/headers';
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import env from '@/env/index';
import { prefix } from '@/config/index';
import {
  Credentials,
  LoginCredentials,
  RegistrationCredentials,
} from '@/types';

// @ts-ignore
async function refreshAccessToken(token) {
  console.log('Now refreshing the expired token...');
  try {
    const res = await fetch(`${env.API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('The token could not be refreshed!');
      throw new Error('Token refresh failed');
    }
    console.log('The token has been refreshed successfully.');
    const decodedAccessToken = JSON.parse(
      Buffer.from(data.token.split('.')[1], 'base64').toString()
    );

    return {
      ...token,
      accessToken: data.token,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: decodedAccessToken.exp * 1000,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}
export const config = {
  trustHost: true,
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },

  providers: [
    // we use credentials provider here
    CredentialsProvider({
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'password', type: 'password' },
        type: { label: 'type', type: 'hidden' },
        firstName: { label: 'firstName', type: 'text', optional: true },
        lastName: { label: 'lastName', type: 'text', optional: true },
        confirmPassword: {
          label: 'confirmPassword',
          type: 'password',
          optional: true,
        },
      },

      async authorize(credentials, req) {
        const { email, password, type } = credentials as Credentials;
        let endpoint = `${env.API_BASE_URL}/auth/signin`;
        let payload: LoginCredentials | RegistrationCredentials;

        if (type === 'register') {
          const { firstName, lastName, confirmPassword } =
            credentials as RegistrationCredentials;
          endpoint = `${env.API_BASE_URL}/auth/signup`;
          payload = {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            type: 'register',
          };
        } else {
          payload = { email, password, type: 'login' };
        }

        // external api for users to log in, change it with your own endpoint
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(payload),
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.message);
        }

        if (res.ok && user) {
          const adaptUser = {
            ...user,
            firstName: user.name as string,
            email: user.email as string,
          };

          cookies().set({
            name: `${prefix}xxx.access-token`,
            value: user.token,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
          });

          cookies().set({
            name: `${prefix}xxx.refresh-token`,
            value: user.refreshToken,
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
          } as any);

          return adaptUser;
        }

        return null;
      },
    }),
  ],
  // this is required

  secret: env.AUTH_SECRET,
  // our custom login page
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user?.token) {
        const decodedAccessToken = JSON.parse(
          Buffer.from(user.token.split('.')[1], 'base64').toString()
        );

        if (decodedAccessToken) {
          token.email = decodedAccessToken.sub as string;
          token.accessTokenExpires = decodedAccessToken.exp * 1000;
        }
        token.id = user.id as string;
        token.accessToken = user.token as string;
        token.refreshToken = user.refreshToken as string;
        token.role = user.role || 'Unknown';
      }

      if (
        token.accessTokenExpires &&
        Date.now() < Number(token.accessTokenExpires)
      ) {
        const { refreshedToken, ...rest } = token;
        return rest;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.token = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.error = token.error;
      session.accessToken = token.accessToken as string;
      return session;
    },

    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const isLoginPage = pathname.startsWith('/login');
      const isSignupPage = pathname.startsWith('/signup');

      if ((isLoginPage || isSignupPage) && auth) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }

      if (isSignupPage || isLoginPage) {
        return true;
      }

      if (!auth) {
        return Response.redirect(
          new URL(`/login?callbackUrl=${request.nextUrl}`, request.nextUrl)
        );
      }

      return !!auth;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
} satisfies NextAuthConfig;

export const { auth, handlers } = NextAuth(config);
