"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import OrgTable from "@/views/OrgTable";

import { deleteOrg, getOrgs, updateOrg, OrgModel } from "@/services/orgService";
import { handleError, runService } from "@/utils/service_utils";

const Dashboard = () => {
  const [orgs, setOrgs] = useState<OrgModel[]>();
  const [loading, setLoading] = useState(false);

  const fetchOrgs = () => {
    setLoading(true);
    runService(
      undefined,
      getOrgs,
      (data) => {
        console.log("orgs: ", data);
        setOrgs(data);
        setLoading(false);
      },
      (status, error) => {
        handleError(status, error);
        setLoading(false);
      }
    );
  };

  const handleDelete = (orgId: string) => {
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

  const handleUpdate = (orgData: OrgModel) => {
    runService(
      orgData,
      updateOrg,
      (data) => {
        setOrgs(
          orgs?.map((org) =>
            org.id !== data.id
              ? org
              : { ...org, isActive: data.isActive, isPremium: data.isPremium }
          )
        );
        toast.success("Organization updated successfully!");
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchOrgs();
  }, []);
  return (
    <>
      <OrgTable
        loading={loading}
        orgs={orgs ?? []}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default Dashboard;
