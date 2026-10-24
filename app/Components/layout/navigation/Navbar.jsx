"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../cart/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import AuthControls from "../../loggedOut/AuthControls"
import { ThemeToggleButton } from "../../../../components/ui/theme-toggle-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/newcollections", label: "Collections" },
  { href: "/catalog", label: "Catalog" },
  { href: "/newarrival", label: "New arrival" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#111] text-white">
      <nav className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-6 px-7 max-[800px]:h-[61px] max-[800px]:px-[18px]" aria-label="Primary navigation">
        <Link href="/" className="flex items-center gap-[9px] whitespace-nowrap text-[15px] font-bold tracking-[.4px] text-white no-underline" onClick={() => setIsOpen(false)}>
          <span className="grid size-7 place-items-center border border-[#d6ff5c] px-[14px] text-[10px] tracking-normal text-[#d6ff5c]">A / W</span>Ahmed Wardrobe</Link>
        <div className={`${isOpen ? "absolute top-[61px] right-0 left-0 [z-index:3] grid gap-4 border-b border-white/10 bg-[#111] p-[18px] min-[801px]:static min-[801px]:flex min-[801px]:items-center min-[801px]:gap-[25px] min-[801px]:border-0 min-[801px]:bg-transparent min-[801px]:p-0" : "hidden min-[801px]:flex min-[801px]:items-center min-[801px]:gap-[25px]"}`}>
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`text-xs font-semibold no-underline transition-colors hover:text-[#d6ff5c] ${pathname === link.href ? "text-[#d6ff5c]" : "text-[#d8d8d8]"}`}>{link.label}</Link>)}
          <Link href="/SignUp" className="mt-1 w-fit border border-[#d6ff5c] px-[14px] py-[9px] text-[11px] font-bold text-[#d6ff5c] no-underline hover:bg-[#d6ff5c] hover:text-[#15200d] min-[801px]:hidden" onClick={() => setIsOpen(false)}>Join us</Link>
        </div>
        <div className="flex items-center gap-[9px] max-[800px]:gap-0.5">
          <button className="grid size-[34px] place-items-center border-0 bg-transparent text-white max-[800px]:hidden" aria-label="Search"><Search size={18} /></button>
          <Link href="/cart" className="relative grid size-[34px] place-items-center text-white no-underline" aria-label={`Shopping bag with ${itemCount} items`}>
            <ShoppingBag size={18} /><span className="absolute top-px right-0 grid h-[13px] min-w-[13px] place-items-center rounded-full bg-[#d6ff5c] px-0.5 text-[8px] font-bold text-[#14200a]">{itemCount}</span>
          </Link>
          <ThemeToggleButton  variant="gif" start="center" gifUrl="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2ZpZnk0Ymg4aWhqbmgwbG10dTA3a255cGt4YjZkZzVyODFyODZqaCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/fxqzWdjvacWEie6gho/giphy.gif"/>
          <AuthControls  />

          <button className="hidden size-[34px] place-items-center border-0 bg-transparent text-white max-[800px]:grid" onClick={() => setIsOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isOpen}>{isOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>
    </header>
  );
}
