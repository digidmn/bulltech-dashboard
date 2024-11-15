"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import {setCookie} from "nookies";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [typingText, setTypingText] = useState('');
    const router = useRouter();

    const validEmail = "test@bulltechgroup.co.za";
    const validPassword = "tPA%G%5FZap^V&p$";
    const animationText = "YOUR PARTNER IN INNOVATION";

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log("Attempting login with:");
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);

            if (email === validEmail && password === validPassword) {
                console.log("Login successful!");
                // Set an authenticated cookie (expires in 1 day)
                setCookie(null, 'authenticated', 'true', {
                    maxAge: 24 * 60 * 60,
                    path: '/',
                });
                router.push('/dashboard');
                console.log("Navigation to /dashboard successful!");
            } else {
                console.log("Login failed: Invalid credentials");
                setError("Invalid email or password.");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Typing Animation Effect
    useEffect(() => {
        let index = 0;
        setTypingText(''); // Ensure it starts fresh
        const interval = setInterval(() => {
            if (index <= animationText.length) {
                setTypingText(animationText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 150); // Adjust speed (in milliseconds) if needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-r from-blue-100 to-purple-200'}`}>
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Welcome Home</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full p-3 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full p-3 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <button
                    onClick={toggleDarkMode}
                    className="mt-4 flex items-center justify-center w-full text-sm font-semibold text-gray-600 dark:text-gray-400"
                >
                    {isDarkMode ? (
                        <>
                            <SunIcon className="w-6 h-6 mr-2"/>
                            Light Mode
                        </>
                    ) : (
                        <>
                            <MoonIcon className="w-6 h-6 mr-2" />
                            Dark Mode
                        </>
                    )}
                </button>
            </div>
            {/* Typing Animation Outside the Login Box */}
            <div className="mt-6 text-center">
                <p className="text-4xl font-extrabold uppercase text-gray-800 dark:text-gray-300">
                    {typingText}
                </p>
            </div>
        </div>
    );
}
