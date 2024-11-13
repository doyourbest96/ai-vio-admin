"use client";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import classNames from "classnames";

import { useEnv } from "@/contexts/EvnContext";

const Header = () => {
  const { openSidebar, setOpenSidebar, openMetabar, setOpenMetabar } = useEnv();

  return (
    <>
      <div className="p-4 flex justify-between items-center border-b">
        <BsLayoutTextSidebarReverse
          className={classNames(
            "w-8 h-8 p-2 rounded-md fill-gray-500 hover:bg-gray-200",
            openSidebar ? "opacity-0" : ""
          )}
          onClick={() => setOpenSidebar(!openSidebar)}
        />
        Header
        <BsLayoutTextSidebar
          className={classNames(
            "w-8 h-8 p-2 rounded-md fill-gray-500 hover:bg-gray-200",
            openMetabar ? "opacity-0" : ""
          )}
          onClick={() => setOpenMetabar(!openMetabar)}
        />
      </div>
    </>
  );
};

export default Header;
