"use client";
import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import ToggleButton from "@/components/extends/ToggleButton";
import Loading from "@/components/Loading";

import { deleteOrg, getOrgs, updateOrg, OrgModel } from "@/services/orgService";
import { handleError, runService } from "@/utils/service_utils";

const Dashboard = () => {
  const [orgs, setOrgs] = useState<OrgModel[]>();
  const [loading, setLoading] = useState(false);

  const fetchOrgs = () => {
    setLoading(true);
    runService(
      undefined,
      getOrgs,
      (data) => {
        console.log("orgs: ", data);
        setOrgs(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );
  };

  const handleDelete = (orgId: string) => {
    runService(
      orgId,
      deleteOrg,
      () => {
        setOrgs(orgs?.filter((org) => org.id !== orgId));
        toast.success("Organization deleted successfully!");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleUpdate = (orgData: OrgModel) => {
    runService(
      orgData,
      updateOrg,
      (data) => {
        setOrgs(
          orgs?.map((org) =>
            org.id !== data.id
              ? org
              : { ...org, isActive: data.isActive, isPremium: data.isPremium }
          )
        );
        toast.success("Organization updated successfully!");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchOrgs();
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
                    Creator Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Organization Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    isActive
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    isPremium
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white overflow-auto">
                {orgs &&
                  orgs.map((org, index) => (
                    <tr
                      key={index}
                      className="even:bg-blue-50 hover:bg-gray-300"
                    >
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {org.creatorType}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {org.name}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {org.size}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {org.createdAt}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <ToggleButton
                          checked={org.isActive ? org.isActive : false}
                          handleChange={() => {
                            handleUpdate({
                              id: org.id,
                              isActive: !org.isActive,
                            });
                          }}
                        />
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <ToggleButton
                          checked={org.isPremium ? org.isPremium : false}
                          handleChange={() =>
                            handleUpdate({
                              id: org.id,
                              isPremium: !org.isPremium,
                            })
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <div
                          className="w-7 p-1 rounded-md cursor-pointer hover:bg-gray-100"
                          onClick={() => handleDelete(org.id ?? "")}
                        >
                          <TrashIcon className="w-5 h-5 stroke-red-500" />
                        </div>
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

export default Dashboard;
