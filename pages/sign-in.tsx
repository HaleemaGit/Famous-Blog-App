import { filter } from "lodash";
import { GetServerSidePropsContext } from "next";
import google from "next-auth/providers/google";
import {
  getSession,
  getCsrfToken,
  signIn,
  getProviders,
} from "next-auth/react";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MINIMUM_ACTIVITY_TIMEOUT = 850;
type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

export default function Page({ csrfToken, providers }) {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const [disabled, setDisabled] = useState(false);

  const email = useRef();
  const password = useRef();

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    try {
      signIn("app-login", {
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });

      setTimeout(
        () => {
          setSubmitting(false);
        }

        // MINIMUM_ACTIVITY_TIMEOUT
      );
    } catch (error) {
      console.error(error);
      //   setError(error)
      setSubmitting(false);
    }
  };

  const handleProviderSignIn = () => {
    // TODO: Perform Google auth
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
    });
  };

  const handleGitHubProviderSignIn = () => {
    // TODO: Perform Google auth
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign in
    signIn("github", {
      callbackUrl: window.location.href,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-center text-2xl font-semibold">
                Create an Account on the Spot or Just Sign In!
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-1 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form
                  className="text-center my-12"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    name="csrfToken"
                    {...register("csrfToken")}
                    type="hidden"
                    defaultValue={csrfToken}
                    hidden
                  />
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      // autoComplete="email"
                      required
                      ref={email}
                      {...register("email")}
                      className="peer placeholder-transparent h-10 w-full rounded  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mt-2"
                      // placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute pt--8 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative mt-8">
                    <input
                      ref={password}
                      {...register("password")}
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      minLength={8}
                      className="peer placeholder-transparent h-10 w-full rounded  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mt-2"
                      // placeholder="Password"
                    />

                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative mt-6 space-y-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button button__md button__primary w-full rounded hover:rounded-lg shadow-xl bg-blue-600 text-white pt-2 pb-2 mt-2 hover:rounded-lg hover:text-white hover:bg-green-500"
                    >
                      {isSubmitting ? (
                        toast.loading("Redirecting...")
                      ) : (
                        // <img src="/assets/loading.svg" />
                        <p>Sign in</p>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-col">
              <hr className="h-0 border-t " />
              <div className="text-sm text-center">
                <span className="px-2 bg-white text-secondary">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              {/* {providers.map((provider) => {
                  return ( */}
              <button
                key=""
                type="button"
                onClick={handleProviderSignIn}
                className="button button__secondary inline-flex space-x-2 flex justify-center items-center bg-gray-200 shadow-2xl rounded hover:rounded-lg hover:text-white hover:bg-blue-600 pt-2 pb-2"
              >
                <img className="w-6 h-6" src={`/assets/google.png`} />
                <p>Google</p>
              </button>
              <button
                key=""
                type="button"
                onClick={handleGitHubProviderSignIn}
                className="button button__secondary inline-flex space-x-2 flex justify-center items-center bg-gray-200 shadow-2xl rounded hover:rounded-lg hover:text-white hover:bg-blue-600 pt-2 pb-2"
              >
                <img className="w-6 h-6" src={`/assets/github-logo.png`} />
                <p>GitHub</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  const csrfToken = await getCsrfToken({ req: context.req });
  const providers = filter(await getProviders(), (provider) => {
    return provider.type !== "credentials";
  });

  return {
    props: { csrfToken, providers },
  };
}
