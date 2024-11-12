"use client"
import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import ToggleButton from "@/components/extends/ToggleButton";
import Loading from "@/components/Loading";

import {
  getUsers,
  updateOther,
  UserModel,
  getMe,
} from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";

const ManageStuff = () => {
  const [me, setMe] = useState<UserModel>();
  const [users, setUsers] = useState<UserModel[]>();
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    runService(
      undefined,
      getUsers,
      (data) => {
        console.log("users: ", data);
        setUsers(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );

    runService(
      undefined,
      getMe,
      (data) => {
        console.log("me: ", data);
        setMe(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleUpdate = (userData: UserModel) => {
    runService(
      userData,
      updateOther,
      (data) => {
        setUsers(
          users?.map((user) =>
            user.id !== data.id ? user : { ...user, enabled: data.enabled }
          )
        );
        toast.success("User updated successfully!");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  // const handleConfirmDelete = (user: UserModel) => {
  //   setCurUser(user);
  //   setDeleteUserModal(true);
  // };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="card flex flex-1 flex-col gap-2 bg-white overflow-auto">
        <div className="flex-1 overflow-auto border rounded">
          {loading ? (
            <Loading />
          ) : (
            <table className="w-full divide-y divide-gray-300">
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 text-left text-sm font-semibold text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white overflow-auto">
                {users &&
                  users.map((user, index) => (
                    <tr
                      key={index}
                      className="even:bg-blue-50 hover:bg-gray-300"
                    >
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {user.firstName}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {user.lastName}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {user.title}
                      </td>
                      <td className="whitespace-nowraptext-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="py-2 flex flex-1 justify-center items-center gap-4">
                        {me && user.id !== me.id ? (
                          <>
                            <ToggleButton
                              checked={user.enabled ? user.enabled : false}
                              handleChange={() => {
                                handleUpdate({
                                  id: user.id,
                                  enabled: !user.enabled,
                                });
                              }}
                            />
                            <div
                              className="p-1 rounded-md cursor-pointer hover:bg-gray-100"
                            >
                              <TrashIcon className="w-5 h-5 stroke-red-500" />
                            </div>
                          </>
                        ) : (
                          <div className="p-1 rounded-md cursor-pointer hover:bg-gray-100">
                            Current User
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageStuff;
