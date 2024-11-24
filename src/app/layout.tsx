// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import '@/styles/globals.css';
import Footer from '../components/Footer';
import ThemeProvider from "../components/ThemeProvider"; // Import the ThemeProvider

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "BullTech Dashboard",
    description: "Analytics and Data Visualization Dashboard by BullTech",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 ease-in-out`}
        >
        <ThemeProvider /> {/* Include ThemeProvider */}
        {children}
        <Footer />
        </body>
        </html>
    );
}
