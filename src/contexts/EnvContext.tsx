"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { requestNotificationPermission } from "@/utils/notification";

interface EnvContextType {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
  openMetabar: boolean;
  setOpenMetabar: (value: boolean) => void;
}

export const EnvContext = createContext<EnvContextType | undefined>(undefined);

export const EnvProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [openMetabar, setOpenMetabar] = useState<boolean>(false);

  useEffect(()=> {
    requestNotificationPermission();
  }, []);

  return (
    <EnvContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        openMetabar,
        setOpenMetabar,
      }}
    >
      {children}
    </EnvContext.Provider>
  );
};

export const useEnv = (): EnvContextType => {
  const context = useContext(EnvContext);
  if (context === undefined) {
    throw new Error("useEnv must be used within an EnvProvider");
  }
  return context;
};
