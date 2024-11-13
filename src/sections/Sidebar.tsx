"use client";
import classNames from "classnames";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

import { useEnv } from "@/contexts/EvnContext";
import Logo from "@/components/Logo";

const Sidebar = () => {
  const { openSidebar, setOpenSidebar } = useEnv();
  return (
    <>
      <div
        className={classNames(
          "w-1/6 min-w-52 h-full flex flex-col border-r",
          openSidebar ? "" : "absolute -translate-x-full"
        )}
      >
        <div className="p-4">
          <BsLayoutTextSidebarReverse
            className="w-8 h-8 p-2 rounded-md fill-gray-500 hover:bg-gray-200"
            onClick={() => setOpenSidebar(!openSidebar)}
          />
        </div>
        <div className="p-4">
          <Logo />
        </div>
        <div className="p-4 flex flex-col gap-6">
          <p>Dashboard</p>
          <div className="flex flex-col gap-4">
            <p>Organizations</p>
            <div className="indent-4 space-y-2 text-sm">
              <p>Requesting Demo</p>
              <p>Allowed Organizations</p>
            </div>
          </div>
          <p>Settings</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
