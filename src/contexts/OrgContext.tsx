"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

import { getRememberMe, getToken } from "@/services/authService";
import { deleteOrg, getOrgs, OrgModel, updateOrg } from "@/services/orgService";
import { handleError, runService } from "@/utils/service_utils";
import { showOSNotification } from "@/utils/notification";
import { useBrowserActivity } from "@/hooks/useBrowserActivity";

interface OrgContextType {
  loading: boolean;
  orgs: OrgModel[] | undefined;
  mode: "request" | "allowed";
  filteredOrgs: OrgModel[] | undefined;
  setOrgs: (orgs: OrgModel[]) => void;
  setMode: (mode: "request" | "allowed") => void;
  handleUpdateOrg: (orgData: OrgModel) => void;
  handleDeleteOrg: (orgId: string) => void;
  wsStatus: "connected" | "disconnected";
}

export const OrgContext = createContext<OrgContextType | undefined>(undefined);

export const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [orgs, setOrgs] = useState<OrgModel[]>();
  const [filteredOrgs, setFilteredOrgs] = useState<OrgModel[]>();
  const [mode, setMode] = useState<"request" | "allowed">("allowed");
  const [wsStatus, setWsStatus] = useState<"connected" | "disconnected">(
    "disconnected"
  );
  const isBrowserActive = useBrowserActivity();

  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    const token = getRememberMe() || getToken();
    ws.current = new WebSocket(
      `ws://localhost:8000/ws/connect?token=Bearer ${token}` // Add 'Bearer' prefix
    );

    ws.current.onopen = () => {
      setWsStatus("connected");
      showOSNotification(
        "Server Connected",
        "Real-time updates are now active"
      );
    };

    ws.current.onclose = () => {
      setWsStatus("disconnected");
      // Attempt to reconnect after 10 seconds
      setTimeout(connectWebSocket, 10 * 1000);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "UPDATE":
          setOrgs((orgs) =>
            orgs?.map((org) =>
              org.id === message.data.id ? message.data : org
            )
          );
          if (isBrowserActive)
            toast.info(`${message.data.name} has been modified`);
          else
            showOSNotification(
              "Organization Updated",
              `${message.data.name} has been modified`
            );
          break;
        case "DELETE":
          setOrgs((orgs) => orgs?.filter((org) => org.id !== message.data.id));
          if (isBrowserActive) toast.info("An organization has been removed");
          else
            showOSNotification(
              "Organization Deleted",
              "An organization has been removed"
            );
          break;
        case "CREATE":
          console.log("org: ", message.data);
          setOrgs((orgs) => [...(orgs || []), message.data]);
          if (isBrowserActive)
            toast.info(`${message.data.name} has been added`);
          else
            showOSNotification(
              "New Organization",
              `${message.data.name} has been added`
            );
          break;
      }
    };

    ws.current.onerror = (error) => {
      console.warn("WebSocket error:", error);
      toast.error("Real-time connection error");
    };
  }, []);

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
        if (wsStatus === "disconnected") {
          setOrgs(orgs?.map((org) => (org.id !== data.id ? org : data)));
          toast.success("Organization updated successfully!");
        }
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
        if (wsStatus === "disconnected") {
          setOrgs(orgs?.filter((org) => org.id !== orgId));
          toast.success("Organization deleted successfully!");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchOrgs();
    connectWebSocket();

    return () => {
      ws.current?.close();
    };
  }, [connectWebSocket]);

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
        wsStatus,
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
