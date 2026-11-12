"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../../Components/loggedOut/loggedOut";
import { useSession } from "next-auth/react";

const AuthControls = () => {
  const {data:session}=useSession()
  if (session?.user) {
    return <LogoutButton />;
  }
  return (
    <>
      <Link
        href="/login"
        className="max-[800px]:hidden border border-[#d6ff5c] px-[14px] py-[9px] text-[11px] font-bold text-[#d6ff5c] no-underline hover:bg-[#d6ff5c] hover:text-[#15200d]"
      >
        Join us
      </Link>
    </>
  );
};

export default AuthControls;
