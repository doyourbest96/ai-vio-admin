import { TrashIcon } from "@heroicons/react/24/outline";
import ToggleButton from "@/components/extends/ToggleButton";
import { OrgModel } from "@/services/orgService";
import { getRelativeTime } from "@/utils/format";
import classNames from "classnames";

const OrgItem = ({
  org,
  mode,
  handleUpdate,
  handleDelete,
}: {
  org: OrgModel;
  mode: "request" | "allowed";
  handleUpdate: (orgData: OrgModel) => void;
  handleDelete: (orgId: string) => void;
}) => {
  return (
    <>
      <tr className="even:bg-blue-50 hover:bg-gray-300">
        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
          {org.name}
        </td>
        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
          {org.size}
        </td>
        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
          {getRelativeTime(org.createdAt ?? "")}
        </td>
        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
          {org.owner?.firstName} {org.owner?.lastName}
        </td>
        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
          {org.owner?.email}
        </td>
        <td
          className={classNames(
            "whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3",
            mode === "allowed" ? "hidden" : ""
          )}
        >
          <span
            className="px-3 py-1 rounded-full cursor-pointer shadow-md text-white bg-green-400 hover:bg-green-500"
            onClick={() => {
              handleUpdate({
                id: org.id,
                isActive: true,
              });
            }}
          >
            Allow
          </span>
        </td>
        <td
          className={classNames(
            "whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3",
            mode === "allowed" ? "" : "hidden"
          )}
        >
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
        <td
          className={classNames(
            "whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3",
            mode === "allowed" ? "" : "hidden"
          )}
        >
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
        <td
          className={classNames(
            "relative whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3",
            mode === "allowed" ? "" : "hidden"
          )}
        >
          <div
            className="w-7 p-1 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleDelete(org.id ?? "")}
          >
            <TrashIcon className="w-5 h-5 stroke-red-500" />
          </div>
          {org.dmlType === "insert" && (
            <span className="absolute right-2 top-2 z-10 bg-green-500 text-white rounded-full px-2 py-1 text-xs">
              New
            </span>
          )}
        </td>
      </tr>
    </>
  );
};

export default OrgItem;
