"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import LogoutButton from "../../Components/loggedOut/loggedOut";
const AuthControls = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.post("/api/auth/me");
                setLoggedIn(Boolean(res.data.user));
            } catch {
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return null;

    if (isLoggedIn) {
        return <LogoutButton />;
    }

    return (<>
        <Link href="/SignIn" className="max-[800px]:hidden border border-[#d6ff5c] px-[14px] py-[9px] text-[11px] font-bold text-[#d6ff5c] no-underline hover:bg-[#d6ff5c] hover:text-[#15200d]">Join us</Link>
    </>
    );
};

export default AuthControls;
