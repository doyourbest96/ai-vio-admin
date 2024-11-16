import { EnvProvider } from "@/contexts/EnvContext";
import { OrgProvider } from "@/contexts/OrgContext";
import { AuthProvider } from "./AuthContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <EnvProvider>
        <OrgProvider>{children}</OrgProvider>
      </EnvProvider>
    </AuthProvider>
  );
};

export default MainProvider;
