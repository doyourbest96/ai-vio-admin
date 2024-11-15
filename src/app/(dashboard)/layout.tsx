import MainProvider from "@/contexts";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Metabar from "@/sections/Metabar";
import Sidebar from "@/sections/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainProvider>
        <div className="relative w-full h-full flex flex-1 flex-row overflow-hidden">
          <Sidebar />
          <div className="w-full h-full flex flex-1 flex-col overflow-auto">
            <Header />
            <div className="p-4 flex-1 overflow-auto">{children}</div>
            <Footer />
          </div>
          <Metabar />
        </div>
      </MainProvider>
    </>
  );
}
