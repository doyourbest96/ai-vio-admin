"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { deleteOrg, getOrgs, OrgModel, updateOrg } from "@/services/orgService";
import { handleError, runService } from "@/utils/service_utils";

interface OrgContextType {
  loading: boolean;
  orgs: OrgModel[] | undefined;
  mode: "request" | "allowed";
  filteredOrgs: OrgModel[] | undefined;
  setOrgs: (orgs: OrgModel[]) => void;
  setMode: (mode: "request" | "allowed") => void;
  handleUpdateOrg: (orgData: OrgModel) => void;
  handleDeleteOrg: (orgId: string) => void;
}

export const OrgContext = createContext<OrgContextType | undefined>(undefined);

export const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [orgs, setOrgs] = useState<OrgModel[]>();
  const [filteredOrgs, setFilteredOrgs] = useState<OrgModel[]>();
  const [mode, setMode] = useState<"request" | "allowed">("allowed");

  const fetchOrgs = () => {
    setLoading(true);
    runService(
      undefined,
      getOrgs,
      (data) => {
        setOrgs(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );
  };

  const handleUpdateOrg = (orgData: OrgModel) => {
    runService(
      orgData,
      updateOrg,
      (data) => {
        setOrgs(orgs?.map((org) => (org.id !== data.id ? org : data)));
        toast.success("Organization updated successfully!");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleDeleteOrg = (orgId: string) => {
    runService(
      orgId,
      deleteOrg,
      () => {
        setOrgs(orgs?.filter((org) => org.id !== orgId));
        toast.success("Organization deleted successfully!");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  useEffect(() => {
    if (mode === "request") {
      setFilteredOrgs(orgs?.filter((org) => org.dmlType === "insert"));
    } else {
      setFilteredOrgs(orgs?.filter((org) => org.dmlType !== "insert"));
    }
  }, [mode, orgs]);

  return (
    <OrgContext.Provider
      value={{
        loading,
        orgs,
        mode,
        filteredOrgs,
        setOrgs,
        setMode,
        handleUpdateOrg,
        handleDeleteOrg,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = (): OrgContextType => {
  const context = useContext(OrgContext);
  if (context === undefined) {
    throw new Error("useOrg must be used within an OrgProvider");
  }
  return context;
};
