import Footer from "@/components/footer";
import Header from "@/components/header";
import { getServerSession } from "next-auth"; 
import { IUser } from "@/types/user";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Header user={session?.user as IUser} />
      {/* <div className="bg-black h-[400px]  max-w-[1064px] mx-auto"></div> */}
      <Footer />
    </main>
  );
}
