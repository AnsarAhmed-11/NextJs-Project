
"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function NewCollectionProductView({
  collection,
  onClose,
}) {
  useEffect(() => {
    if (!collection) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [collection, onClose]);

  if (!collection) return null;

  // Default collection details
  const collectionDetails = {
    label: "NEW COLLECTION",
    season: "2026 EDITION",
    category: "Men's Wear",
    description:
      "Discover thoughtfully selected styles designed for comfort, confidence and everyday elegance.",
    highlights: [
      "Premium-inspired styling",
      "Modern silhouettes",
      "Versatile everyday looks",
    ],
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-5xl overflow-hidden bg-white md:grid-cols-2 scale-85"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 text-black shadow-md transition hover:bg-black hover:text-white"
          aria-label="Close collection"
        >
          <X size={20} />
        </button>

        {/* Collection Image */}
        <div className="relative min-h-[350px] bg-gray-100 md:min-h-[600px]">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute left-5 top-5 bg-black px-4 py-2 text-xs tracking-[3px] text-white">
            {collectionDetails.label}
          </div>
        </div>

        {/* Collection Information */}
        <div className="flex flex-col justify-center p-7 md:p-12">
          <div className="mb-6 flex items-center gap-2 text-xs tracking-[3px] text-gray-500">
            <Sparkles size={15} />
            {collectionDetails.season}
          </div>

          <p className="mb-3 text-xs uppercase tracking-[3px] text-gray-500">
            {collectionDetails.category}
          </p>

          <h2 className="mb-5 text-3xl font-light uppercase tracking-wide text-black md:text-5xl">
            {collection.title}
          </h2>

          <p className="mb-8 text-sm leading-7 text-gray-600">
            {collection.text}
          </p>

          <div className="mb-8 border-y border-gray-200 py-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              About this collection
            </h3>

            <p className="text-sm leading-7 text-gray-600">
              {collection.description ||
                collectionDetails.description}
            </p>
          </div>

          <div className="mb-9">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Collection highlights
            </h3>

            <ul className="space-y-3">
              {collectionDetails.highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/shop"
            onClick={onClose}
            className="flex items-center justify-between bg-black px-6 py-4 text-sm uppercase tracking-[2px] text-white transition hover:bg-gray-800"
          >
            Explore Collection
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={onClose}
            className="mt-4 text-xs uppercase tracking-widest text-gray-500 hover:text-black"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
