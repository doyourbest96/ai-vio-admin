"use client";
import Link from "next/link";
import classNames from "classnames";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { PiUserCircleThin } from "react-icons/pi";
import { PiUserCirclePlusLight } from "react-icons/pi";

import InviteAdmin from "./InviteAdmin";
import Logo from "@/components/Logo";

import { useAuth } from "@/contexts/AuthContext";
import { useEnv } from "@/contexts/EnvContext";
import { useOrg } from "@/contexts/OrgContext";
import { signOut } from "@/services/authService";

const Sidebar = () => {
  const { openSidebar, setOpenSidebar } = useEnv();
  const { invite, setInvite, handleInvite } = useAuth();
  const { mode, setMode } = useOrg();

  return (
    <>
      <InviteAdmin
        open={invite}
        handleInvite={handleInvite}
        handleClose={() => setInvite(false)}
      />
      <div
        className={classNames(
          "absolute z-20 w-1/6 min-w-56 h-full flex flex-col border-r bg-white lg:shadow-none lg:static lg:z-0 transition-all duration-300",
          openSidebar ? "shadow-lg" : "!absolute -translate-x-full"
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
            href={"/orgs"}
            className="p-2 flex flex-row items-center gap-2 cursor-pointer rounded-sm hover:bg-gray-200"
          >
            <MdOutlineSpaceDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <div className="flex flex-1 flex-col">
            <Link
              href={"/orgs"}
              className="p-2 flex flex-row items-center gap-2 cursor-pointer rounded-sm hover:bg-gray-200"
            >
              <GoOrganization className="w-5 h-5" />
              Organizations
            </Link>
            <div className="flex flex-col indent-6 text-sm">
              <p
                className={classNames(
                  "p-2 cursor-pointer rounded-sm hover:bg-gray-200",
                  mode === "request" && "bg-gray-300"
                )}
                onClick={() => setMode("request")}
              >
                Requesting Demo
              </p>
              <p
                className={classNames(
                  "p-2 cursor-pointer rounded-sm hover:bg-gray-200",
                  mode === "allowed" && "bg-gray-300"
                )}
                onClick={() => setMode("allowed")}
              >
                Allowed Organizations
              </p>
            </div>
          </div>
          <p className="p-2 flex flex-row items-center gap-2 cursor-pointer rounded-sm hover:bg-gray-200">
            <IoSettingsOutline className="w-5 h-5" />
            Settings
          </p>
        </div>
        <div className="p-4 mt-auto space-y-4">
          <p
            className="p-2 flex flex-row justify-center items-center gap-2 cursor-pointer border rounded-full shadow-sm hover:bg-gray-200"
            onClick={() => setInvite(true)}
          >
            <PiUserCirclePlusLight className="w-5 h-5" />
            Invite Admin
          </p>
          <p
            className="p-2 flex flex-row justify-center items-center gap-2 cursor-pointer border rounded-full shadow-sm hover:bg-gray-200"
            onClick={signOut}
          >
            <PiUserCircleThin className="w-5 h-5" />
            Sign Out
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
