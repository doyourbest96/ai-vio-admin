import { EnvProvider } from "@/contexts/EvnContext";
import { OrgProvider } from "@/contexts/OrgContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EnvProvider>
      <OrgProvider>{children}</OrgProvider>
    </EnvProvider>
  );
};

export default MainProvider;
