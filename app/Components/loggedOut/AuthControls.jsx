
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
    const [isOpen, setIsOpen] = useState(false);

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

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setLoggedIn(false);
            toast.success("Logged out successfully");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("Logout failed");
        }
    };

    if (loading) return null;

    if (isLoggedIn) {
        return <LogoutButton onClick={handleLogout} />;
    }

    return (<>
        <Link href="/SignUp" className='join'>Join us</Link>
    </>
    );
};

export default AuthControls;