"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";

import Logo from "@/components/Logo";
import FormHelperText from "@/components/extends/FormHelperText";

import { handleError, runService } from "@/utils/service_utils";
import { resetPassword } from "@/services/authService";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  const handleReset = async (password: string) => {
    await runService(
      { password, token },
      resetPassword,
      (data) => {
        if (data.success === true) {
          toast.success("Your password has been reset successfully.");
          router.push("/login");
        }
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };
  return (
    <>
      <div className="flex min-h-dvh flex-1">
        <div className="flex flex-1 flex-col justify-center">
          <div className="px-6 py-8 mx-auto w-full max-w-md border rounded-lg shadow-lg">
            <div>
              <Logo />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">
                Reset Password
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <Formik
                  initialValues={{
                    password: "",
                    password2: "",
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string()
                      .min(8, "Must be at least 8 characters")
                      .max(255)
                      .required("Password is required"),
                    password2: Yup.string().equals(
                      [Yup.ref("password")],
                      "Passwords must match"
                    ),
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleReset(values.password);
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
                            autoComplete="password"
                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-900  sm:text-sm sm:leading-6 "
                          />
                        </div>
                        {touched.password && errors.password && (
                          <FormHelperText>{errors.password}</FormHelperText>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password2"
                          className="block text-sm font-medium leading-6 "
                        >
                          Confirm Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password2"
                            name="password2"
                            type="password"
                            value={values.password2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            autoComplete="password2"
                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-900  sm:text-sm sm:leading-6 "
                          />
                        </div>
                        {touched.password2 && errors.password2 && (
                          <FormHelperText>{errors.password2}</FormHelperText>
                        )}
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="mt-10"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
