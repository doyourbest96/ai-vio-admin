"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { sendInviteLink } from "@/services/authService";
import { handleError, runService } from "@/utils/service_utils";

interface AuthContextType {
  invite: boolean;
  setInvite: (invite: boolean) => void;
  handleInvite: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [invite, setInvite] = useState(false);

  const handleInvite = (email: string) => {
    setInvite(false);
    runService(
      { email },
      sendInviteLink,
      (data) => {
        if (data.success === true) {
          toast.success("Successfully sent invite.");
        } else {
          toast.error("Something goes wrong.");
        }
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        invite,
        setInvite,
        handleInvite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
