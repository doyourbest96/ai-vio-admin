import { FC } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProviderProps } from "@/types/AuthProviderProps";

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AuthProvider;
