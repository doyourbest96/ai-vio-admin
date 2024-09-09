import { FC } from "react";
import { AuthLayoutProps } from "@/types/AuthLayoutProps";

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
