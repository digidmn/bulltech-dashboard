"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

interface DistributionDataProps {
    departmentLabels: string[];
    userCountsPerDepartment: number[];
    companyLabels: string[];
    userCountsPerCompany: number[];
    projectStatusLabels: string[];
    projectStatusCounts: number[];
}

export default function DistributionCharts({
                                               departmentLabels,
                                               userCountsPerDepartment,
                                               companyLabels,
                                               userCountsPerCompany,
                                               projectStatusLabels,
                                               projectStatusCounts,
                                           }: DistributionDataProps) {
    // State to detect dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect dark mode using document class
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };

        // Initial check
        checkDarkMode();

        // Listen for changes in the theme
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    // Common axis styles based on the theme
    const axisTextColor = isDarkMode ? "#D1D5DB" : "#1F2937";
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    // Chart options with fixed styling
    const commonOptions = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                ticks: {
                    color: axisTextColor,
                    font: {
                        weight: "bold",
                        size: 14,
                    },
                },
                grid: {
                    color: gridColor,
                },
            },
            y: {
                ticks: {
                    color: axisTextColor,
                    font: {
                        weight: "bold",
                        size: 14,
                    },
                },
                grid: {
                    color: gridColor,
                },
            },
        },
    };

    // Data for Users per Department
    const usersPerDepartmentData = {
        labels: departmentLabels,
        datasets: [
            {
                label: "Users per Department",
                data: userCountsPerDepartment,
                backgroundColor: "#4BC0C0",
            },
        ],
    };

    // Data for Users per Company (Top 10)
    const usersPerCompanyData = {
        labels: companyLabels,
        datasets: [
            {
                label: "Users per Company",
                data: userCountsPerCompany,
                backgroundColor: "#36A2EB",
            },
        ],
    };

    // Data for Projects by Status
    const projectsByStatusData = {
        labels: projectStatusLabels,
        datasets: [
            {
                label: "Projects Count",
                data: projectStatusCounts,
                backgroundColor: "#FF6384",
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users per Department */}
            <div className="p-6 bg-gradient-to-br from-blue-500/30 to-cyan-700/20 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/10 dark:ring-gray-800/50 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-extrabold mb-4 text-center text-cyan-700 dark:text-cyan-400 tracking-wider">
                    Users per Department
                </h3>
                <Bar data={usersPerDepartmentData} options={commonOptions} />
            </div>

            {/* Users per Company (Top 10) */}
            <div className="p-6 bg-gradient-to-br from-purple-500/30 to-indigo-700/20 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/10 dark:ring-gray-800/50 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-extrabold mb-4 text-center text-indigo-700 dark:text-indigo-400 tracking-wider">
                    Users per Company (Top 10)
                </h3>
                <Bar data={usersPerCompanyData} options={commonOptions} />
            </div>

            {/* Projects by Status */}
            <div className="p-6 bg-gradient-to-br from-pink-500/30 to-red-700/20 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/10 dark:ring-gray-800/50 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-extrabold mb-4 text-center text-pink-700 dark:text-pink-400 tracking-wider">
                    Projects by Status
                </h3>
                <Bar data={projectsByStatusData} options={commonOptions} />
            </div>
        </div>
    );
}
