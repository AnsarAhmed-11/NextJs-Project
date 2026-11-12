"use client"
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="max-w-xl w-full text-center">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-white tracking-tighter">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-300">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-300 text-base md:text-lg leading-relaxed">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition duration-200 w-full sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 transition duration-200 w-full sm:w-auto"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-gray-400">
          Error Code: 404 | Page Not Found
        </p>

      </div>
    </main>
  );
}
