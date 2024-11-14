import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

import { OrderBy } from "@/contexts/OrgContext";
import { OrgModel } from "@/services/orgService";

const SortableHeader = ({
  label,
  value,
  orderBy,
  handleChangeSort,
}: {
  label: string;
  value: keyof OrgModel;
  orderBy: OrderBy;
  handleChangeSort: (value: keyof OrgModel) => void;
}) => {
  return (
    <th
      className="px-3 py-3.5 flex flex-row items-center gap-2 text-left cursor-pointer"
      onClick={() => handleChangeSort(value)}
    >
      <span className="text-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <div className="p-1 flex flex-col -space-y-2 rounded-md hover:bg-gray-300">
        <TiArrowSortedUp
          className={
            orderBy.field === value && orderBy.direction === "asc"
              ? "fill-blue-600"
              : "fill-gray-400"
          }
        />
        <TiArrowSortedDown
          className={
            orderBy.field === value && orderBy.direction === "desc"
              ? "fill-blue-600"
              : "fill-gray-400"
          }
        />
      </div>
    </th>
  );
};

export default SortableHeader;
