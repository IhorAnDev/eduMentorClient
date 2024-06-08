import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type IToken = {
  accessToken: string;
  refreshToken?: string;
};

export interface CurrentUserProps {
  currentUser?: {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password: string | null;
    isAdmin: boolean;
  } | null;
}

export type LoginCredentials = {
  email: string;
  password: string;
  type: string;
};

export type RegistrationCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  type: string;
};

export type Credentials = LoginCredentials | RegistrationCredentials;

export interface Company {
  companyId: number;
  companyName: string;
  ownerId: number;
  companyCourses: any[];
}

export type CompanyStudent = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type Course = {
  courseId: number;
  courseName: string;
  courseDescription: string;
  isEnabled: boolean;
  imageUrl: string;
};
export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
