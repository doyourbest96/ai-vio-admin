import { TrashIcon } from "@heroicons/react/24/outline";
import ToggleButton from "@/components/extends/ToggleButton";
import { OrgModel } from "@/services/orgService";

const OrgItem = ({ org, handleUpdate, handleDelete }: { org: OrgModel, handleUpdate: (orgData: OrgModel) => void, handleDelete: (orgId: string) => void }) => {
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
        <td className="relative whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
          <div
            className="w-7 p-1 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleDelete(org.id ?? "")}
          >
            <TrashIcon className="w-5 h-5 stroke-red-500" />
          </div>
          {org.dmlType === "update" && (
            <span className="absolute right-1 top-1 z-10 bg-green-500 text-white rounded-full px-2 py-1 text-xs">
              New
            </span>
          )}
        </td>
      </tr>
    </>
  );
};

export default OrgItem;
