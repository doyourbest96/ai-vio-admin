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

interface OrgContextType {
  loading: boolean;
  orgs: OrgModel[] | undefined;
  mode: "request" | "allowed";
  orderBy: { field: SortableFields; direction: "asc" | "desc" };
  filteredOrgs: OrgModel[] | undefined;
  setOrgs: (orgs: OrgModel[]) => void;
  setMode: (mode: "request" | "allowed") => void;
  setOrderBy: (orderBy: OrderBy) => void;
  handleUpdateOrg: (orgData: OrgModel) => void;
  handleDeleteOrg: (orgId: string) => void;
  wsStatus: "connected" | "disconnected";
}

type SortableFields = keyof OrgModel;

export type OrderBy = {
  field: SortableFields;
  direction: "asc" | "desc";
};

export const OrgContext = createContext<OrgContextType | undefined>(undefined);

export const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [orgs, setOrgs] = useState<OrgModel[]>();
  const [filteredOrgs, setFilteredOrgs] = useState<OrgModel[]>();
  const [mode, setMode] = useState<"request" | "allowed">("allowed");
  const [orderBy, setOrderBy] = useState<OrderBy>({
    field: "createdAt",
    direction: "asc",
  });

  const [wsStatus, setWsStatus] = useState<"connected" | "disconnected">(
    "disconnected"
  );

  const isBrowserActive = useCallback(() => {
    return document.visibilityState === "visible";
  }, []);

  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    const token = getRememberMe() || getToken();
    ws.current = new WebSocket(
      `ws://localhost:8000/ws/connect?token=Bearer ${token}` // Add 'Bearer' prefix
    );

    ws.current.onopen = () => {
      setWsStatus("connected");
      if (isBrowserActive() === true)
        toast.info("Real-time updates are now active");
      else
        showOSNotification(
          "Server Connected",
          "Real-time updates are now active"
        );
    };

    ws.current.onclose = () => {
      setWsStatus("disconnected");
      // Attempt to reconnect after 1 min
      setTimeout(connectWebSocket, 60 * 1000);
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
          if (isBrowserActive() === true)
            toast.info(`${message.data.name} has been modified`);
          else
            showOSNotification(
              "Organization Updated",
              `${message.data.name} has been modified`
            );
          break;
        case "DELETE":
          setOrgs((orgs) => orgs?.filter((org) => org.id !== message.data.id));
          if (isBrowserActive() === true)
            toast.info("An organization has been removed");
          else
            showOSNotification(
              "Organization Deleted",
              "An organization has been removed"
            );
          break;
        case "CREATE":
          console.log("org: ", message.data);
          setOrgs((orgs) => [...(orgs || []), message.data]);
          if (isBrowserActive() === true)
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
     if (!orgs) return;

     let filtered =
       mode === "request"
         ? orgs.filter((org) => org.dmlType === "insert")
         : orgs.filter((org) => org.dmlType !== "insert");

     if (orderBy) {
       filtered = filtered.sort((a, b) => {
         const aValue =
           orderBy.field.includes("date") && a[orderBy.field]
             ? new Date(a[orderBy.field] as string).getTime()
             : String(a[orderBy.field] ?? "").toLowerCase();

         const bValue =
           orderBy.field.includes("date") && b[orderBy.field]
             ? new Date(b[orderBy.field] as string).getTime()
             : String(b[orderBy.field] ?? "").toLowerCase();

         if (orderBy.direction === "desc") {
           return bValue > aValue ? 1 : -1;
         }
         return aValue > bValue ? 1 : -1;
       });
     }

     setFilteredOrgs(filtered);
  }, [mode, orgs, orderBy]);

  return (
    <OrgContext.Provider
      value={{
        loading,
        orgs,
        mode,
        orderBy,
        filteredOrgs,
        setOrgs,
        setMode,
        setOrderBy,
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
