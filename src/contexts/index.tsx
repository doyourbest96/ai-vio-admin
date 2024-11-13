import { EnvProvider } from "@/contexts/EvnContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return <EnvProvider>{children}</EnvProvider>;
};

export default MainProvider;
