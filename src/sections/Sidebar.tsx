"use client";
import Link from "next/link";
import classNames from "classnames";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

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
        <div className="p-4 flex flex-col gap-2 text-gray-900">
          <Link
            href={"/dashboard"}
            className="p-2 flex flex-row items-center gap-2 cursor-pointer rounded-sm hover:bg-gray-200"
          >
            <MdOutlineSpaceDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <div className="flex flex-col">
            <Link
              href={"/orgs"}
              className="p-2 flex flex-row items-center gap-2 cursor-pointer rounded-sm hover:bg-gray-200"
            >
              <GoOrganization className="w-5 h-5" />
              Organizations
            </Link>
            <div className="flex flex-col indent-6 text-sm">
              <Link
                href={"/orgs/request"}
                className="p-2 cursor-pointer rounded-sm hover:bg-gray-200"
              >
                Requesting Demo
              </Link>
              <Link
                href={"/orgs/allowed"}
                className="p-2 cursor-pointer rounded-sm hover:bg-gray-200"
              >
                Allowed Organizations
              </Link>
            </div>
          </div>
          <p className="p-2 flex flex-row items-center gap-2 cursor-pointer rounded-sm hover:bg-gray-200">
            <IoSettingsOutline className="w-5 h-5" />
            Settings
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
