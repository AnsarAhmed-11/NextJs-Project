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
      <button className='logoutButton' onClick={handleLogout} disabled={logOut}><LogOut size={16} /><span>{logOut ? "Signing out…" : "Sign out"}</span>
      </button>
    </div>
  )
}
export default LogoutButton