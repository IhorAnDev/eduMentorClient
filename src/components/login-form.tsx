'use client';

import { useSearchParams } from 'next/navigation';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  async function login(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // whatever your type
    const callbackUrl = searchParams.get('callbackUrl');
    signIn('credentials', {
      email,
      password,
      redirect: false,
      type: 'login',
    }).then((res: SignInResponse | undefined) => {
      if (!res) {
        alert('No response!');
        return;
      }
      if (!res.ok) alert('Something went wrong!');
      else if (res.error) {
        console.log(res.error);

        if (res.error == 'CallbackRouteError')
          alert('Could not login! Please check your credentials.');
        else alert(`Internal Server Error: ${res.error}`);
      } else {
        if (callbackUrl) router.push(callbackUrl);
        else router.push('/dashboard');
      }
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
      <input type="hidden" name="type" value="login" />
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
