import React, { useState } from 'react'
import { LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from "react-hot-toast";

/**
 * - Logout Component
 * - POST api/auth/logout
 */
const LogoutButton = () => {
  const [logOut, setLogOut] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    if (logOut) return;
    setLogOut(true);
    try {
      console.log("clicked");

      const response = await axios.post("/api/auth/logout");
      if(response.data.success===true){
        toast.success("logout SuccessFully");
        router.replace("/SignIn");
        router.refresh();
      }else{
        toast.error("LogOut Failed")
        setLogOut(false)
      }

    } catch {
      setLogOut(false);
    }
  }
  return (
    <div>
      <button className="inline-flex min-h-[35px] items-center justify-center gap-[7px] rounded-md border border-[#e2e7f0] bg-white px-3 text-xs font-semibold text-[#44516a] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60" onClick={handleLogout} disabled={logOut}><LogOut size={16} /><span>{logOut ? "Signing out…" : "Sign out"}</span>
      </button>
    </div>
  )
}
export default LogoutButton
