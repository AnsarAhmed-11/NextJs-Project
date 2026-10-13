import React, { useState } from 'react'
import { LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from "react-hot-toast";

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      console.log("clicked");

      const response = await axios.post("/api/auth/logout");
      toast.success("logout SuccessFully");
      router.replace("/SignIn");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  }
  return (
    <div>
      <button className='logoutButton' onClick={handleLogout} disabled={isLoggingOut}><LogOut size={16} /><span>{isLoggingOut ? "Signing out…" : "Sign out"}</span>
      </button>
    </div>
  )
}
export default LogoutButton