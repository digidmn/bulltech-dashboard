// src/components/Footer.tsx
"use client";

export default function Footer() {
    return (
        <footer className="w-full py-4 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Produced by Michael Douman
        </footer>
    );
}
