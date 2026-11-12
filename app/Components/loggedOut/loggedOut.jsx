import React, { useState } from 'react'
import { LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react"

const LogoutButton = () => {
  const [logOut, setLogOut] = useState(false)
  return (
    <div>
      <button className="inline-flex min-h-[35px] items-center justify-center gap-[7px]  rounded-md border border-[#e2e7f0] bg-white px-3 text-xs font-semibold text-[#44516a] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60" onClick={()=>{
        signOut({callbackUrl:"/login"})
      }}>
        <LogOut size={16} />
        <span>
          {logOut ? "Signing out…" : "Sign out"}
        </span>
      </button>
    </div>
  )
}
export default LogoutButton
