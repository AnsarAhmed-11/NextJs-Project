
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import {
  Delius,
  Exo_2,
  Inter,
  Playfair_Display,
} from "next/font/google";
import { CartProvider } from "./Components/cart/CartContext";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-Logo",
});

const myFont = Delius({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-delius",
});

export const metadata: Metadata = {
  title: "Ahmed Wardrobe",
  description: "The Fahsion That Feels luxury",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfairDisplayHeading.variable} ${exo.variable} ${myFont.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <CartProvider>
            <Toaster />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
