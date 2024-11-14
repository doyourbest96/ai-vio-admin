"use client";
import classNames from "classnames";
import { useEnv } from "@/contexts/EnvContext";
import { BsLayoutTextSidebar } from "react-icons/bs";

const Metabar = () => {
  const { openMetabar, setOpenMetabar } = useEnv();
  return (
    <>
      <div
        className={classNames(
          "w-1/6 min-w-60 h-full flex flex-col border-l",
          openMetabar ? "" : "absolute -translate-x-full"
        )}
      >
        <div className="p-4 flex justify-end">
          <BsLayoutTextSidebar
            className="w-8 h-8 p-2 rounded-md fill-gray-500 hover:bg-gray-200"
            onClick={() => setOpenMetabar(!openMetabar)}
          />
        </div>
        <div className="p-4">Metabar</div>
      </div>
    </>
  );
};

export default Metabar;
