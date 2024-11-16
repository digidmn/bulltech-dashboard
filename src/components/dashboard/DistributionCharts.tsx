// src/components/DistributionCharts.tsx
"use client";

import { Bar } from "react-chartjs-2";

interface DistributionDataProps {
    departmentLabels: string[];
    userCountsPerDepartment: number[];
    companyLabels: string[];
    userCountsPerCompany: number[];
    projectStatusLabels: string[];
    projectStatusCounts: number[];
    companyNames: string[];
    departmentCounts: number[];
}

export default function DistributionCharts({
                                               departmentLabels,
                                               userCountsPerDepartment,
                                               companyLabels,
                                               userCountsPerCompany,
                                               projectStatusLabels,
                                               projectStatusCounts,
                                               companyNames,
                                               departmentCounts,
                                           }: DistributionDataProps) {
    // Horizontal Bar Chart for Users per Department
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

    // Horizontal Bar Chart for Users per Company (Top 10)
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

    // Vertical Bar Chart for Projects by Status
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

    // Grouped Bar Chart for Departments in Companies
    const departmentsInCompaniesData = {
        labels: companyNames,
        datasets: [
            {
                label: "Departments Count",
                data: departmentCounts,
                backgroundColor: "#FFCE56",
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Users per Department */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Users per Department</h3>
                <Bar
                    data={usersPerDepartmentData}
                    options={{
                        indexAxis: "y",
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                        },
                    }}
                />
            </div>

            {/* Users per Company */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Users per Company (Top 10)</h3>
                <Bar
                    data={usersPerCompanyData}
                    options={{
                        indexAxis: "y",
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                        },
                    }}
                />
            </div>

            {/* Projects by Status */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Projects by Status</h3>
                <Bar
                    data={projectsByStatusData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                        },
                    }}
                />
            </div>

            {/* Departments in Companies */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Departments in Companies</h3>
                <Bar
                    data={departmentsInCompaniesData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                        },
                    }}
                />
            </div>
        </div>
    );
}
