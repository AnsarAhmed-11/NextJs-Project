"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../cart/CartContext";
import styles from "./navbar.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import AuthControls from "../../loggedOut/AuthControls"
import { ThemeToggleButton } from "../../../../components/ui/skiper-ui/skiper26";

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
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Primary navigation">
        <Link href="/" className={styles.brand} onClick={() => setIsOpen(false)}>
          <span>A / W</span>Ahmed Wardrobe</Link>
        <div className={`${styles.links} ${isOpen ? styles.linksOpen : ""}`}>
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={pathname === link.href ? styles.active : ""}>{link.label}</Link>)}
          <Link href="/SignUp" className={styles.mobileJoin} onClick={() => setIsOpen(false)}>Join us</Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search"><Search size={18} /></button>
          <Link href="/cart" className={styles.bagButton} aria-label={`Shopping bag with ${itemCount} items`}>
            <ShoppingBag size={18} /><span>{itemCount}</span>
          </Link>
          <ThemeToggleButton  variant="gif" start="center" gifUrl="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2ZpZnk0Ymg4aWhqbmgwbG10dTA3a255cGt4YjZkZzVyODFyODZqaCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/fxqzWdjvacWEie6gho/giphy.gif"/>
          <AuthControls  />

          <button className={styles.menuButton} onClick={() => setIsOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isOpen}>{isOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>
    </header>
  );
}
