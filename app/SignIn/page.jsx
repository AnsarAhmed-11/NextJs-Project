"use client";

import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const formHandler = async (prevData, formData) => {
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await axios.post("/api/auth/login",
                {
                    email,
                    password,
                }
            );
            console.log(res.data);
            if(res.data.success){
                setFormData({email:"",password:""})
            }
            if (res.data.status === true) {
                if (res.data.user.role === "Super_Admin") {
                    toast.success("welcome to Admin Profile")
                    return router.push("/superAdmin")
                }
                router.push("/")
                toast.success("Login successful!");
                return {
                    error: null,
                    message: null,
                };
            }

            // API response failed
            const errorMessage =
                res.data.error ||
                res.data.message ||
                "Login failed";

            toast.error(errorMessage);

            return {
                error: errorMessage,
                message: null,
            };
        } catch (err) {
            const errorMessage =
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Invalid email or password";

            toast.error(errorMessage);

            return {
                error: errorMessage,
                message: null,
            };
        }
    };

    const [data, action, pending] = useActionState(
        formHandler,
        {
            error: null,
            message: null,
        }
    );

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-card px-5 py-10 text-card-foreground max-[600px]:px-[15px] max-[600px]:py-[25px]">
            <div className="pointer-events-none absolute -top-[100px] -left-[100px] size-[300px] rounded-full bg-[#f72585] opacity-30 blur-[100px]"></div>
            <div className="pointer-events-none absolute -right-[100px] -bottom-[100px] size-[300px] rounded-full bg-[#4cc9f0] opacity-30 blur-[100px]"></div>

            <section className="relative [z-index:2] w-full max-w-[460px] rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-[0_0_5px_#f72585,0_0_15px_rgba(247,37,133,.6),inset_0_0_30px_rgba(255,255,255,.02)] backdrop-blur-xl animate-[shadowColor_8s_infinite_linear] max-[600px]:rounded-[18px] max-[600px]:px-5 max-[600px]:py-[25px]">

                <div className="mb-[25px] text-center">
                    <h2 className="mb-2 text-[32px] font-black uppercase tracking-[2px] text-transparent [-webkit-text-stroke:1px_var(--foreground)] max-[600px]:text-[26px]">Login</h2>

                    <p className="text-sm text-muted-foreground">
                        Sign in to continue your journey.
                    </p>
                </div>

                {/* Social Login */}
                <div className="flex flex-col gap-3">

                    <button
                        type="button"
                        className="flex min-h-11 w-full items-center justify-center gap-[10px] rounded-[10px] border border-border bg-secondary text-sm font-semibold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:border-[#4cc9f0] hover:bg-white/10 hover:shadow-[0_0_8px_rgba(76,201,240,.4)] active:translate-y-0 max-[600px]:text-[13px]"
                        onClick={() => {
                            toast.error("Not working");
                        }}
                    >
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="flex min-h-11 w-full items-center justify-center gap-[10px] rounded-[10px] border border-border bg-secondary text-sm font-semibold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:border-[#4cc9f0] hover:bg-white/10 hover:shadow-[0_0_8px_rgba(76,201,240,.4)] active:translate-y-0 max-[600px]:text-[13px]"
                        onClick={() => {
                            toast.error("Not working");
                        }}
                    >
                        Continue with GitHub
                    </button>

                </div>

                <div className="my-[25px] flex items-center gap-[15px] text-xs text-[#666]"><span className="h-px flex-1 bg-white/10"></span>
                    <span className="text-[#777]">OR</span><span className="h-px flex-1 bg-white/10"></span>
                </div>

                {/* Login Form */}
                <form action={action} className="flex flex-col gap-[18px] max-[600px]:gap-[15px]">

                    {/* Email */}
                    <div className="flex flex-col gap-[7px]">
                        <label className="text-[13px] font-semibold text-foreground" htmlFor="email">
                            Email address
                        </label>

                        <div className="relative w-full">
                            <span className="pointer-events-none absolute top-1/2 left-[13px] -translate-y-1/2 text-[15px] text-[#888]">
                                ✉
                            </span>

                            <input
                                className="h-11 w-full rounded-[10px] border border-input bg-background px-[45px] text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[#4cc9f0] focus:bg-white/[.08] focus:shadow-[0_0_0_2px_rgba(76,201,240,.1),0_0_10px_rgba(76,201,240,.2)]"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-[7px]">

                        <div className="flex items-center justify-between">
                            <label className="text-[13px] font-semibold text-foreground" htmlFor="password">
                                Password
                            </label>

                            <a
                                href="/forgot-password"
                                className="text-[11px] text-[#4cc9f0] no-underline hover:text-[#90e0ef] hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <div className="relative w-full">

                            <span className="pointer-events-none absolute top-1/2 left-[13px] -translate-y-1/2 text-[15px] text-[#888]">
                                🔒
                            </span>

                            <input
                                className="h-11 w-full rounded-[10px] border border-input bg-background px-[45px] text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[#4cc9f0] focus:bg-white/[.08] focus:shadow-[0_0_0_2px_rgba(76,201,240,.1),0_0_10px_rgba(76,201,240,.2)]"
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                                required
                            />

                            <button
                                type="button"
                                className="absolute top-1/2 right-[10px] -translate-y-1/2 border-0 bg-transparent text-xs font-semibold text-[#4cc9f0] hover:text-[#90e0ef]"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>
                    </div>

                    {/* Remember Me */}
                    <label className="flex cursor-pointer items-start gap-[9px] text-xs leading-[1.5] text-muted-foreground">
                        <input
                            className="mt-0.5 size-[15px] accent-[#f72585]"
                            type="checkbox"
                            name="remember"
                        />

                        <span className="text-[#888]">
                            Remember me
                        </span>
                    </label>
                    <ThemeToggleButton variant="gif" gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG5sMXJod2l2NWxrM29xbXJic3I2dzUzeXo3NjFlaGZ5ZmkzNGRwYyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/KGjlaKWM8L2yoLrky6/giphy.gif"/>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={pending}
                        className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[10px] border-0 bg-[linear-gradient(90deg,#f72585,#7209b7,#4361ee,#4cc9f0)] [background-size:300%_100%] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(247,37,133,.6),0_0_25px_rgba(76,201,240,.3)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-[.65] animate-[gradientMove_5s_ease_infinite]"
                    >
                        {pending ? (
                            <>
                                <span className="size-[15px] animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                                Signing in...
                            </>
                        ) : (
                            "Sign In →"
                        )}
                    </button>

                </form>

                {/* Error */}
                {data?.error && (
                    <div className="mt-[15px] rounded-lg border border-red-500/30 bg-red-500/[.08] px-[13px] py-[11px] text-[13px] text-[#ff6b6b]">
                        ⚠ {data.error}
                    </div>
                )}

                {/* Success */}
                {data?.message && !data?.error && (
                    <div className="mt-[15px] rounded-lg border border-emerald-400/30 bg-emerald-400/[.08] px-[13px] py-[11px] text-[13px] text-[#5cffb0]">
                        ✓ {data.message}
                    </div>
                )}

                <p className="mt-[22px] text-center text-[13px] text-muted-foreground">
                    Don't have an account?{" "}
                    <a className="font-semibold text-[#4cc9f0] no-underline hover:text-[#90e0ef] hover:underline" href="/SignUp">
                        Create account
                    </a>
                </p>

            </section>
        </main>
    );
};

export default LoginForm;
