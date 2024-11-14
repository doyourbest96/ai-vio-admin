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
          "absolute z-20 right-0 w-1/6 min-w-72 h-full flex flex-col border-l bg-white lg:shadow-none lg:static lg:z-0 transition-all duration-300",
          openMetabar ? "shadow-lg" : "!absolute translate-x-full"
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
