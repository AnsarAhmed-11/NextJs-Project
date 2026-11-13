import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      type="button"
      className="inline-flex min-h-[35px] items-center justify-center gap-[7px] border border-[#d6ff5c] px-3 text-[11px] font-bold text-[#d6ff5c] transition-colors hover:bg-[#d6ff5c] hover:text-[#15200d]"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut size={14} />
      <span>Sign out</span>
    </button>
  );
};

export default LogoutButton;
