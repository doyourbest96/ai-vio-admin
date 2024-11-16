"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

import Logo from "@/components/Logo";
import Select from "@/components/extends/Select";
import FormHelperText from "@/components/extends/FormHelperText";

import { handleError, runService } from "@/utils/service_utils";
import { requestDemo, saveToken } from "@/services/authService";

const companySizeOptions = [
  { value: "1-10", name: "1-10" },
  { value: "11-20", name: "11-20" },
  { value: "21-50", name: "21-50" },
  { value: "51-100", name: "51-100" },
  { value: "101-200", name: "101-200" },
  { value: "201-500", name: "201-500" },
  { value: "501-1000", name: "501-1000" },
  { value: "1001-2000", name: "1001-2000" },
  { value: "2001-5000", name: "2001-5000" },
  { value: "5001-10000", name: "5001-10000" },
  { value: "10001+", name: "10001+" },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const invite = searchParams.get("invite");

  const router = useRouter();
  const handleRegister = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    companyName?: string,
    companySize?: string
  ) => {
    setIsLoading(true);
    console.log("sending request");
    runService(
      {
        user: {
          email,
          password,
          firstName,
          lastName,
          companyName,
          companySize,
        },
        invite,
      },
      requestDemo,
      (data) => {
        saveToken(data.token);
        toast.success(
          "Successfully requested a demo! We'll contact to you soon."
        );
        router.push("/login");
        setIsLoading(false);
      },
      (statusCode, error) => {
        handleError(statusCode, error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!invite) {
      toast.error("You are not invited to register.");
    }
  }, [invite]);

  return (
    <>
      <div className="flex min-h-dvh flex-1">
        <div className="flex flex-1 flex-col justify-center">
          <div className="px-6 py-8 mx-auto w-full max-w-md border rounded-lg shadow-lg">
            <div>
              <Logo />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">
                Sign up to your account
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    companyName: undefined,
                    companySize: undefined,
                    email: "",
                    password: "",
                    invite: invite ? true : false,
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string().required("First name is required"),
                    lastName: Yup.string().required("Last name is required"),
                    companyName: Yup.string().when("invite", {
                      is: false,
                      then: (schema) =>
                        schema.required("Company name is required"),
                      otherwise: (schema) => schema.notRequired(),
                    }),
                    companySize: Yup.string().when("invite", {
                      is: false,
                      then: (schema) =>
                        schema.required("Company size is required"),
                      otherwise: (schema) => schema.notRequired(),
                    }),
                    email: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Email is required"),
                    password: Yup.string()
                      .max(255)
                      .required("Password is required"),
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleRegister(
                      values.email,
                      values.password,
                      values.firstName,
                      values.lastName,
                      values.companyName,
                      values.companySize
                    );
                    setSubmitting(false);
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    touched,
                    values,
                  }) => (
                    <form
                      noValidate
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="flex gap-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium leading-6 "
                          >
                            First Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={values.firstName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              required
                              autoComplete="text"
                              className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.firstName && errors.firstName && (
                            <FormHelperText>{errors.firstName}</FormHelperText>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium leading-6 "
                          >
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={values.lastName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              required
                              autoComplete="text"
                              className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.lastName && errors.lastName && (
                            <FormHelperText>{errors.lastName}</FormHelperText>
                          )}
                        </div>
                      </div>
                      {(invite === undefined || invite === "") && (
                        <div className="flex gap-4">
                          <div className="w-full">
                            <label
                              htmlFor="companyName"
                              className="block text-sm font-medium leading-6 "
                            >
                              Company Name
                            </label>
                            <div className="mt-2">
                              <input
                                id="companyName"
                                name="companyName"
                                type="text"
                                value={values.companyName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                required
                                autoComplete="text"
                                className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                              />
                            </div>
                            {touched.companyName && errors.companyName && (
                              <FormHelperText>
                                {errors.companyName}
                              </FormHelperText>
                            )}
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="companyName"
                              className="block text-sm font-medium leading-6 "
                            >
                              Company Size
                            </label>
                            <div className="mt-2">
                              <Select
                                data={companySizeOptions}
                                onChange={(selectedItem) => {
                                  if (selectedItem.value !== values.companySize)
                                    setFieldValue(
                                      "companySize",
                                      selectedItem.value
                                    );
                                }}
                              />
                            </div>
                            {touched.companySize && errors.companySize && (
                              <FormHelperText>
                                {errors.companySize}
                              </FormHelperText>
                            )}
                          </div>
                        </div>
                      )}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 "
                        >
                          Business Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
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
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                          />
                        </div>
                        {touched.password && errors.password && (
                          <FormHelperText>{errors.password}</FormHelperText>
                        )}
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting || isLoading}
                          className="w-full flex-center inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-primary-foreground hover:bg-blue-400/90 h-10 px-4 py-1.5 text-white select-none font-roboto disabled:bg-gray-100"
                        >
                          Sign Up
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
