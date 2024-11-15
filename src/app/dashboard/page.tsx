// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies, destroyCookie } from 'nookies';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import {
    SunIcon,
    MoonIcon,
    UserCircleIcon,
    MagnifyingGlassIcon, PowerIcon,
    BuildingOfficeIcon,
    ClipboardDocumentIcon,
    TicketIcon,
} from '@heroicons/react/24/outline';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale
);

interface DashboardData {
    usersCount: number;
    companiesCount: number;
    departmentsCount: number;
    projectsCount: number;
    openTickets: number;
    resolvedTickets: number;
    avgResponseTime: number;
    firstResponseTime: number;
    avgResolutionTime: number;
    ticketBacklog: number;
    csatScore: number;
    npsScore: number;
    clv: number;
    churnRate: number;
    newCustomers: number;
    totalCustomers: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const isAuthenticated = parseCookies()['authenticated'] === 'true';
        if (!isAuthenticated) {
            router.push('/auth/login');
        } else {
            fetchDashboardData();
        }
    }, [router]);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/dashboard-data');
            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        destroyCookie(null, 'authenticated');
        router.push('/auth/login');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
                <svg
                    className="w-12 h-12 mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h.01M12 8h.01M12 19c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                </svg>
                <p className="text-lg font-semibold">An error occurred while fetching data.</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6`}>
            {/* Top Navigation Bar */}
            <nav className={`flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg`}>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-4">
                    {/* Dark/Light Mode Toggle */}
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-blue-500" />}
                    </button>
                    {/* User Profile Icon */}
                    <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                    {/* Logout Button */}
                    <button onClick={logout}>
                        <PowerIcon className="w-6 h-6 text-red-500" />
                    </button>
                </div>
            </nav>

            {/* Analytics Heading with Search Bar */}
            <div className="container mx-auto flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Analytics</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="p-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white shadow-sm"
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users Card */}
                    <div
                        className="relative p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                            <UserCircleIcon className="w-24 h-24 text-white"/>
                        </div>
                        <h3 className="text-lg font-bold relative z-10">Total Users</h3>
                        <p className="text-2xl font-semibold relative z-10">{data?.usersCount}</p>
                    </div>

                    {/* Total Companies Card */}
                    <div
                        className="relative p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-400 to-teal-600 text-white">
                        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                            <BuildingOfficeIcon className="w-24 h-24 text-white"/>
                        </div>
                        <h3 className="text-lg font-bold relative z-10">Total Companies</h3>
                        <p className="text-2xl font-semibold relative z-10">{data?.companiesCount}</p>
                    </div>

                    {/* Total Projects Card */}
                    <div
                        className="relative p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-400 to-red-600 text-white">
                        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                            <ClipboardDocumentIcon className="w-24 h-24 text-white"/>
                        </div>
                        <h3 className="text-lg font-bold relative z-10">Total Projects</h3>
                        <p className="text-2xl font-semibold relative z-10">{data?.projectsCount}</p>
                    </div>

                    {/* Open Tickets Card */}
                    <div
                        className="relative p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                            <TicketIcon className="w-24 h-24 text-white"/>
                        </div>
                        <h3 className="text-lg font-bold relative z-10">Open Tickets</h3>
                        <p className="text-2xl font-semibold relative z-10">{data?.openTickets}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
