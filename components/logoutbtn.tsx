import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh(); // ✅ Refresh the page to update UI instantly
  };

  return (
    <button onClick={handleLogout}  className="text-blue bg-white px-4 py-2 rounded-lg hover:bg-blue200 font-semibold text-base transition-all ease-in-out duration-300">
      Logout
    </button>
  );
};

export default LogoutButton;
