import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    cognitoGroups: string[];
    token: string;
    refreshToken: string;
    idToken: string;
    exp: number;
    role: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
    expires: string;
    error: string | any;
    accessToken: string;
  }
}
