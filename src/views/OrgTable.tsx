import classNames from "classnames";

import Loading from "@/components/Loading";
import OrgItem from "@/components/OrgItem";
import SortableHeader from "@/components/extends/SortableHeader";

import { useOrg } from "@/contexts/OrgContext";
import { OrgModel } from "@/services/orgService";

const OrgTable = () => {
  const {
    loading,
    filteredOrgs,
    mode,
    orderBy,
    setOrderBy,
    handleUpdateOrg,
    handleDeleteOrg,
  } = useOrg();

  const handleChangeSort = (field: keyof OrgModel) => {
    setOrderBy({
      field,
      direction:
        orderBy.field === field && orderBy.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-2 bg-white overflow-auto">
      <div className="flex-1 overflow-auto border rounded">
        {loading ? (
          <Loading />
        ) : (
          <table className="w-full divide-y divide-gray-300 overflow-auto">
            <thead className="text-left bg-white sticky top-0 z-10">
              <tr>
                <SortableHeader
                  label="Organization"
                  value="name"
                  orderBy={orderBy}
                  handleChangeSort={handleChangeSort}
                />
                <th
                  scope="col"
                  className="px-3 py-3.5 text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500"
                >
                  Size
                </th>
                <SortableHeader
                  label="Created At"
                  value="createdAt"
                  orderBy={orderBy}
                  handleChangeSort={handleChangeSort}
                />
                <th
                  scope="col"
                  className="px-3 py-3.5 text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500"
                >
                  Owner
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-6 py-3.5 text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500 transition-all duration-200",
                    mode === "allowed" ? "hidden" : ""
                  )}
                >
                  Allow
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-3 py-3.5 text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500 transition-all duration-200",
                    mode === "allowed" ? "" : "hidden"
                  )}
                >
                  Active
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-3 py-3.5 text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500 transition-all duration-200",
                    mode === "allowed" ? "" : "hidden"
                  )}
                >
                  Premium
                </th>
                <th
                  scope="col"
                  className={classNames(
                    "px-3 py-3.5 text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500 transition-all duration-200",
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
