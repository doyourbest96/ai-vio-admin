import { InviteAdminProps } from "@/types";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";

export default function InviteAdmin({
  open,
  handleInvite,
  handleClose,
}: InviteAdminProps) {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={handleClose}>
          <div className="fixed inset-0 bg-black/65 z-40" />
          <div className="fixed inset-0 py-10 overflow-y-auto z-40">
            <div className="flex min-h-full items-center justify-center text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="max-w-lg w-full flex flex-col rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900 rounded-md"
                  >
                    Invite Admin
                  </DialogTitle>
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .required("Email is required")
                        .email("Invalid Email"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(false);
                      handleInvite(values.email);
                      setSubmitting(true);
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
                      <form noValidate onSubmit={handleSubmit}>
                        <div className="px-6 py-3 flex flex-col gap-2 text-sm bg-gray-50 rounded-md">
                          <div className="flex flex-col">
                            <p className="text-base text-gray-600 py-4">
                              Revolutionize your sales team with our
                              cutting-edge AI-powered Sales Development
                              Representative project.
                              <br />
                              Join us in unlocking unparalleled efficiency and
                              success. Click the invite button below to onboard
                              your top talent and witness the future of sales.
                            </p>
                            <label
                              htmlFor="email"
                              className="font-semibold py-2"
                            >
                              Email:
                            </label>
                            <div className="flex gap-4">
                              <div className="w-full flex flex-col">
                                <input
                                  id="email"
                                  type="text"
                                  placeholder="username@example.com"
                                  className="block h-9 w-full px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm border border-gray-300 hover:border-gray-500 rounded-md focus:border-gray-500"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.email && errors.email && (
                                  <FormHelperText>
                                    {errors.email}
                                  </FormHelperText>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end gap-4 text-sm">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="min-w-28 gap-2 flex-center inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-primary-foreground hover:bg-blue-400/90 h-10 px-4 py-1.5 text-white select-none font-roboto disabled:bg-gray-100"
                            >
                              Invite
                            </button>
                            <button
                              className="min-w-28 gap-2 flex-center inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary-foreground hover:bg-gray-100/90 h-10 px-4 py-1.5 text-gray-900 select-none border font-roboto"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
