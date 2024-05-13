'use client';

import { SignInResponse, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Route } from "@/routers/types"


export default function LoginForm() {
  const searchParams = useSearchParams();

  async function login(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    console.log(email, password);
    // whatever your type
    const callbackUrl = searchParams.get('/company');
    signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then((res: SignInResponse | undefined) => {
      if (!res) {
        alert('No response!');
        return;
      }

      if (!res.ok) alert('Something went wrong!');
      else if (res.error) {
        console.log(res.error);

        // eslint-disable-next-line eqeqeq
        if (res.error == 'CallbackRouteError')
          alert('Could not login! Please check your credentials.');
        else alert(`Internal Server Error: ${res.error}`);
      } else if (callbackUrl) router.push(callbackUrl as Route);
      else router.push('/company');
    });
    return false;
  }
  return (
    <form className="space-y-6" onSubmit={e => login(e)} method="POST">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="text-sm" />
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
