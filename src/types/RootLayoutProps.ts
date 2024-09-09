import { ReactNode } from "react";

export interface RootLayoutProps {
  children: ReactNode;
}

export interface Params {
  params: {
    organizationId: string;
  };
}
