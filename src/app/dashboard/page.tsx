// src/app/dashboard/page.tsx
"use client";

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {parseCookies, destroyCookie} from 'nookies';
import SimpleMetrics from '../../components/dashboard/SimpleMetrics';
import TimeSeriesCharts from '../../components/dashboard/TimeSeriesCharts';
import DistributionCharts from '../../components/dashboard/DistributionCharts';
import StatusCharts from '../../components/dashboard/StatusCharts';

import {
    SunIcon,
    MoonIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    PowerIcon,
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
    clvDates: string[];
    clvValues: number[];
    churnRateDates: string[];
    churnRates: number[];
    loginDates: string[];
    loginCounts: number[];
    newCustomerDates: string[];
    newCustomerCounts: number[];
    // Distribution Data
    departmentLabels: string[];
    userCountsPerDepartment: number[];
    companyLabels: string[];
    userCountsPerCompany: number[];
    projectStatusLabels: string[];
    projectStatusCounts: number[];
    companyNames: string[];
    departmentCounts: number[];
    // Status Data
    ticketStatusLabels: string[];
    ticketStatusCounts: number[];
    resolutionRate: number;
    backlogCounts: number[];
    backlogLabels: string[];
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
            console.log("API Data:", result);

            // Ensure all fields are properly set
            setData({
                usersCount: result.usersCount || 0,
                ticketStatusCounts: JSON.parse(JSON.stringify(result.ticketStatusCounts || [])),
                ticketStatusLabels: JSON.parse(JSON.stringify(result.ticketStatusLabels || [])),
                clvValues: JSON.parse(JSON.stringify(result.clvValues || [])),
                loginCounts: JSON.parse(JSON.stringify(result.loginCounts || [])),
                companiesCount: result.companiesCount || 0,
                departmentsCount: result.departmentsCount || 0,
                projectsCount: result.projectsCount || 0,
                openTickets: result.openTickets || 0,
                resolvedTickets: result.resolvedTickets || 0,
                avgResponseTime: result.avgResponseTime || 0,
                firstResponseTime: result.firstResponseTime || 0,
                avgResolutionTime: result.avgResolutionTime || 0,
                ticketBacklog: result.ticketBacklog || 0,
                csatScore: result.csatScore || 0,
                npsScore: result.npsScore || 0,
                clv: result.clv || 0,
                churnRate: result.churnRate || 0,
                newCustomers: result.newCustomers || 0,
                totalCustomers: result.totalCustomers || 0,
                clvDates: result.clvDates || [],
                churnRateDates: result.churnRateDates || [],
                churnRates: result.churnRates || [],
                loginDates: result.loginDates || [],
                newCustomerDates: result.newCustomerDates || [],
                newCustomerCounts: result.newCustomerCounts || [],
                departmentLabels: result.departmentLabels || [],
                userCountsPerDepartment: result.userCountsPerDepartment || [],
                companyLabels: result.companyLabels || [],
                userCountsPerCompany: result.userCountsPerCompany || [],
                projectStatusLabels: result.projectStatusLabels || [],
                projectStatusCounts: result.projectStatusCounts || [],
                companyNames: result.companyNames || [],
                departmentCounts: result.departmentCounts || [],
                resolutionRate: result.resolutionRate || 0,
                backlogCounts: result.backlogCounts || [],
                backlogLabels: result.backlogLabels || [],
            });
        } catch (err: any) {
            console.error("Fetch error:", err);
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
                <p className="text-lg font-semibold">An error occurred while fetching data.</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6`}>
            {/* Top Navigation Bar */}
            <nav className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-400"/> :
                            <MoonIcon className="w-6 h-6 text-blue-500"/>}
                    </button>
                    <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-300"/>
                    <button onClick={logout}>
                        <PowerIcon className="w-6 h-6 text-red-500"/>
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
                    <MagnifyingGlassIcon
                        className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"/>
                </div>
            </div>

            <div className="container mx-auto mb-6">
                <SimpleMetrics
                    usersCount={data?.usersCount || 0}
                    companiesCount={data?.companiesCount || 0}
                    projectsCount={data?.projectsCount || 0}
                    totalCustomers={data?.totalCustomers || 0}
                    openTickets={data?.openTickets || 0}
                    firstResponseTime={data?.firstResponseTime || 0}
                    avgResolutionTime={data?.avgResolutionTime || 0}
                    avgResponseTime={data?.avgResponseTime || 0}
                />
            </div>

            <div className="container mx-auto mb-6">
                <TimeSeriesCharts
                    newCustomerDates={data?.newCustomerDates || []}
                    newCustomerCounts={data?.newCustomerCounts || []}
                    churnRateDates={data?.churnRateDates || []}
                    churnRates={data?.churnRates || []}
                    loginDates={data?.loginDates || []}
                    loginCounts={data?.loginCounts || []}
                    clvDates={data?.clvDates || []}
                    clvValues={data?.clvValues || []}
                />
            </div>

            <div className="container mx-auto mb-6">
                <DistributionCharts
                    departmentLabels={data?.departmentLabels || []}
                    userCountsPerDepartment={data?.userCountsPerDepartment || []}
                    companyLabels={data?.companyLabels || []}
                    userCountsPerCompany={data?.userCountsPerCompany || []}
                    projectStatusLabels={data?.projectStatusLabels || []}
                    projectStatusCounts={data?.projectStatusCounts || []}
                    companyNames={data?.companyNames || []}
                    departmentCounts={data?.departmentCounts || []}
                />
            </div>

            <div className="container mx-auto mb-6">
                <StatusCharts
                    ticketStatusLabels={data?.ticketStatusLabels || []}
                    ticketStatusCounts={data?.ticketStatusCounts || []}
                    resolutionRate={data?.resolutionRate || 0}
                    backlogCounts={data?.backlogCounts || []}
                    backlogLabels={data?.backlogLabels || []}
                />
            </div>
        </div>
    );
}
