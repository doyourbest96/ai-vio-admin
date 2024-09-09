import { Room } from "@/app/Room";
import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  const { getToken } = auth();

  const token = await getToken({ template: "supabase" });

  return (
    <main>
      <div className="flex flex-row h-screen">
        <div className="bg-white 2xl:w-1/6 md:w-[250px] p-5 border-r border-r-slate-300">
          <Sidebar token={token} />
        </div>
        <div className="relative flex-1">
          <Room />
        </div>
      </div>
    </main>
  );
}
