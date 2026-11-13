"use client";

import Link from "next/link";
import LogoutButton from "../../Components/loggedOut/loggedOut";
import { useSession } from "next-auth/react";

const AuthControls = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session?.user) {
    return <LogoutButton />;
  }
  return (
    <Link
      href="/login"
      className="inline-flex w-fit border border-[#d6ff5c] px-[14px] py-[9px] text-[11px] font-bold text-[#d6ff5c] no-underline transition-colors hover:bg-[#d6ff5c] hover:text-[#15200d]"
    >
      Join us
    </Link>
  );
};

export default AuthControls;
