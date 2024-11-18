"use client";

import React from "react";
import { SunIcon, MoonIcon, UserCircleIcon, PowerIcon } from "@heroicons/react/24/outline";

interface TopNavProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    logout: () => void;
}

export default function TopNav({ isDarkMode, toggleDarkMode, logout }: TopNavProps) {
    return (
        <nav className="flex justify-between sticky top-0 z-50 items-center mb-6 p-4 bg-white/20 dark:bg-gray-900/30 backdrop-blur-md shadow-2xl rounded-3xl ring-1 ring-white/10 dark:ring-gray-800/50">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-600">Bulltech Dashboard</h1>
            <div className="flex items-center gap-4">
                {/* Dark Mode Toggle Button */}
                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-lg bg-white/10 dark:bg-gray-400/10 transition duration-300 shadow-md hover:bg-blue-500/70 hover:text-white dark:hover:bg-yellow-400/80 dark:hover:text-black"
                >
                    {isDarkMode ? (
                        <SunIcon className="w-6 h-6" />
                    ) : (
                        <MoonIcon className="w-6 h-6" />
                    )}
                </button>

                {/* User Icon with Link */}
                <a
                    href="https://digidmn.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 dark:bg-gray-400/10 transition duration-300 shadow-md hover:bg-purple-500/70 hover:text-white dark:hover:bg-indigo-400/80 dark:hover:text-black"
                >
                    <UserCircleIcon className="w-8 h-8" />
                </a>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="p-3 rounded-lg bg-white/10 dark:bg-gray-400/10 transition duration-300 shadow-md hover:bg-red-500/70 hover:text-white dark:hover:bg-red-400/80 dark:hover:text-black"
                >
                    <PowerIcon className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
