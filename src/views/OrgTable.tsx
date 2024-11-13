import Loading from "@/components/Loading";
import OrgItem from "@/components/OrgItem";

import { OrgModel } from "@/services/orgService";

const OrgTable = ({
  loading,
  orgs,
  handleDelete,
  handleUpdate,
}: {
  loading: boolean;
  orgs: OrgModel[];
  handleDelete: (orgId: string) => void;
  handleUpdate: (orgData: OrgModel) => void;
}) => {
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
                orgs.map((org, idx) => (
                  <OrgItem
                    key={idx}
                    org={org}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                  />
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrgTable;
