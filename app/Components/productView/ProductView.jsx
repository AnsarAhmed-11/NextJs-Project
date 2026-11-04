"use client";

import Image from "next/image";
import { Check, Heart, ShieldCheck, Truck, X } from "lucide-react";
import { useEffect } from "react";

export default function ProductView({ product, onClose, onAddToCart }) {
  useEffect(() => {
    if (!product) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const price = Number(product.price);
  const formattedPrice = Number.isFinite(price)
    ? `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
    : product.price;

  const handleAddToCart = () => {
    onAddToCart?.(product);
    onClose();
  };

  return (
    <div
      aria-label={`${product.name} details`}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111]/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="relative grid max-h-[min(760px,calc(100vh-24px))] w-full max-w-5xl overflow-y-auto rounded-[28px] bg-[#f7f6f1] text-[#1b1b1a] shadow-2xl dark:bg-zinc-900 dark:text-zinc-100 sm:max-h-[calc(100vh-48px)] md:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#1b1b1a] shadow-sm transition hover:bg-white focus-visible:ring-2 focus-visible:ring-[#778a48] focus-visible:outline-none dark:bg-zinc-800/90 dark:text-white dark:hover:bg-zinc-800"
          onClick={onClose}
          type="button"
        >
          <X size={19} strokeWidth={1.8} />
        </button>

        <div className="relative min-h-[340px] bg-[#dedbd2] sm:min-h-[520px]">
          <Image
            alt={product.name}
            className="object-cover object-top"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 52vw"
            src={product.image}
          />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-[#d6ff5c] px-3 py-2 text-[10px] font-bold uppercase tracking-[1.1px] text-[#1d270d]">
            <Check size={13} strokeWidth={2.5} /> Curated piece
          </span>
        </div>

        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex items-start justify-between gap-5 pr-8">
            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[1.4px] text-[#778a48]">
                {product.category || "The Luma selection"}
              </p>
              <h2 className="mt-3 mb-0 max-w-md text-[clamp(28px,4vw,46px)] font-medium leading-[.98]">
                {product.name}
              </h2>
            </div>
            <button
              aria-label={`Save ${product.name}`}
              className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-[#d7d5cd] text-[#4d4c46] transition hover:border-[#1b1b1a] hover:text-[#1b1b1a] focus-visible:ring-2 focus-visible:ring-[#778a48] focus-visible:outline-none dark:border-white/20 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white"
              type="button"
            >
              <Heart size={18} strokeWidth={1.8} />
            </button>
          </div>

          <p className="mt-6 mb-0 text-xl font-bold tracking-[-.02em]">
            {formattedPrice}
          </p>

          <p className="mt-5 mb-0 text-sm leading-7 text-[#64635d] dark:text-zinc-300">
            {product.description || "A considered everyday piece with an easy silhouette and thoughtful details, designed to stay in rotation."}
          </p>

          <div className="mt-7 grid gap-3 border-y border-[#dedcd4] py-5 text-[11px] text-[#5d5c56] dark:border-white/15 dark:text-zinc-300 sm:grid-cols-3">
            <span className="flex items-center gap-2"><Truck size={15} /> Ships in 2–4 days</span>
            <span className="flex items-center gap-2"><ShieldCheck size={15} /> Easy 30-day returns</span>
            <span className="flex items-center gap-2"><Check size={15} /> Quality checked</span>
          </div>

          <div className="mt-auto pt-7">
            <button
              className="flex min-h-12 w-full items-center justify-center bg-[#1b1b1a] px-6 text-[11px] font-bold uppercase tracking-[1px] text-white transition hover:bg-[#3a3a36] focus-visible:ring-2 focus-visible:ring-[#778a48] focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-[#d6ff5c] dark:text-[#1d270d] dark:hover:bg-[#c5eb50]"
              onClick={handleAddToCart}
              type="button"
            >
              Add to bag
            </button>
            <button
              className="mt-3 min-h-11 w-full border border-[#d7d5cd] px-6 text-[11px] font-bold uppercase tracking-[1px] text-[#35352f] transition hover:bg-white focus-visible:ring-2 focus-visible:ring-[#778a48] focus-visible:outline-none dark:border-white/20 dark:text-zinc-100 dark:hover:bg-white/10"
              onClick={onClose}
              type="button"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
