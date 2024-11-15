"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";

import Logo from "@/components/Logo";
import CheckBox from "@/components/extends/CheckBox";
import FormHelperText from "@/components/extends/FormHelperText";
import ForgotPassword from "@/sections/ForgotPassword";

import {
  getRememberMe,
  login,
  removeRememberMe,
  saveRememberMe,
  saveToken,
  sendResetLink,
} from "@/services/authService";
import { handleError, runService } from "@/utils/service_utils";

export default function SignIn() {
  const [forgot, setForgot] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getRememberMe();
    if (token) {
      saveToken(token);
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    await runService(
      { email, password },
      login,
      (data) => {
        if (rememberMe) saveRememberMe(data.token);
        else removeRememberMe();

        saveToken(data.token);
        router.push("/");
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };
  return (
    <>
      <ForgotPassword
        open={forgot}
        handleSend={(email: string) => {
          runService(
            { email },
            sendResetLink,
            (data) => {
              if (data.success === true) {
                toast.success("Reset link has been sent to your email.");
              } else toast.error("Something goes wrong.");
            },
            (status, error) => {
              handleError(status, error);
            }
          );
          setForgot(false);
        }}
        handleClose={() => setForgot(false)}
      />
      <div className="flex min-h-dvh flex-1">
        <div className="flex flex-1 flex-col justify-center">
          <div className="px-6 py-8 mx-auto w-full max-w-md border rounded-lg shadow-lg">
            <div>
              <Logo />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Email is required"),
                    password: Yup.string()
                      .max(255)
                      .required("Password is required"),
                  })}
                  onSubmit={async (
                    values,
                    { setSubmitting }
                  ) => {
                    setSubmitting(true);
                    await handleLogin(values.email, values.password);
                    setSubmitting(false);
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                  }) => (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 "
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            autoComplete="email"
                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-900  sm:text-sm sm:leading-6 "
                          />
                        </div>
                        {touched.email && errors.email && (
                          <FormHelperText>{errors.email}</FormHelperText>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 "
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {touched.password && errors.password && (
                          <FormHelperText>{errors.password}</FormHelperText>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <CheckBox
                          id="remember-me"
                          content="Remember me"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />

                        <div className="text-sm leading-6">
                          <a
                            href="#"
                            className="font-semibold hover:underline hover:text-blue-500"
                            onClick={() => setForgot(true)}
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
