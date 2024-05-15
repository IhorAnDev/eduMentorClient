import { cookies, headers } from 'next/headers';
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import env from '@/env/index';
import { privateRoutes } from '@/contains/constants'; // an array like ["/", "/account"]
import {
  Credentials,
  LoginCredentials,
  RegistrationCredentials,
} from '@/types';

// @ts-ignore
async function refreshAccessToken(token) {
  console.log('Now refreshing the expired token...');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
      {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ email: token.email }),
      }
    );

    const { success, data } = await response.json();

    if (!success) {
      console.log('The token could not be refreshed!');
      throw data;
    }

    console.log('The token has been refreshed successfully.');
    const decodedAccessToken = JSON.parse(
      Buffer.from(data.accessToken.split('.')[1], 'base64').toString()
    );

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: decodedAccessToken.exp,
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
        console.log('credentials => ', credentials);
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
          const prefix = process.env.NODE_ENV === 'development' ? '__Dev-' : '';

          const adaptUser = {
            ...user,
            firstName: user.name as string,
            email: user.email as string,
            accessToken: user.token as string,
          };

          // we set http only cookie here to store refresh token information as we will not append it to our session to avoid maximum size warning for the session cookie (4096 bytes)
          cookies().set({
            name: `${prefix}xxx.refresh-token`,
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
  secret: process.env.AUTH_SECRET,
  // our custom login page
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user?.accessToken) {
        const decodedAccessToken = JSON.parse(
          Buffer.from(user.accessToken.split('.')[1], 'base64').toString()
        );

        if (decodedAccessToken) {
          token.email = decodedAccessToken.sub as string;
          token.accessTokenExpires = decodedAccessToken.exp * 1000;
        }
        token.role = user.role || 'Unknown';
      }
      if (
        token.accessTokenExpires &&
        Date.now() > Number(token.accessTokenExpires)
      ) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      console.log('session => ', session);

      return {
        ...session,
        user: {
          ...session.user,
          email: token.email as string,
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          role: (token.role as string) || 'Unknown',
        },
        error: token.error,
      };
    },
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const isLoginPage = pathname.startsWith('/login');
      const isSignupPage = pathname.startsWith('/signup');

      if ((isLoginPage || isSignupPage) && auth) {
        return Response.redirect(new URL('/company', request.nextUrl));
      }

      if (isSignupPage || isLoginPage) {
        return true; // Allow access to login and signup pages
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
