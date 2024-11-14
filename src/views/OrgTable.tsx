import classNames from "classnames";

import Loading from "@/components/Loading";
import OrgItem from "@/components/OrgItem";

import { useOrg } from "@/contexts/OrgContext";

const OrgTable = () => {
  const { loading, filteredOrgs, mode, handleUpdateOrg, handleDeleteOrg } = useOrg();

  return (
    <div className="flex flex-1 flex-col gap-2 bg-white overflow-auto">
      <div className="flex-1 overflow-auto border rounded">
        {loading ? (
          <Loading />
        ) : (
          <table className="w-full divide-y divide-gray-300">
            <thead className="bg-white sticky top-0 z-10">
              <tr>
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
                  Owner
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-6 py-3.5 text-left text-sm font-semibold text-gray-900 transition-all duration-200",
                    mode === "allowed" ? "hidden" : ""
                  )}
                >
                  Allow
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 transition-all duration-200",
                    mode === "allowed" ? "" : "hidden"
                  )}
                >
                  isActive
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 transition-all duration-200",
                    mode === "allowed" ? "" : "hidden"
                  )}
                >
                  isPremium
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 transition-all duration-200",
                    mode === "allowed" ? "" : "hidden"
                  )}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white overflow-auto">
              {filteredOrgs &&
                filteredOrgs.map((org, idx) => (
                  <OrgItem
                    key={idx}
                    org={org}
                    mode={mode}
                    handleUpdate={handleUpdateOrg}
                    handleDelete={handleDeleteOrg}
                  />
                ))}
              <tr></tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrgTable;
