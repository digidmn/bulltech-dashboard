// src/components/TimeSeriesCharts.tsx
"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

interface TimeSeriesDataProps {
    newCustomerDates: string[];
    newCustomerCounts: number[];
    churnRateDates: string[];
    churnRates: number[];
    loginDates: string[];
    loginCounts: number[];
    clvDates: string[];
    clvValues: number[];
}

export default function TimeSeriesCharts({
                                             newCustomerDates,
                                             newCustomerCounts,
                                             churnRateDates,
                                             churnRates,
                                             loginDates,
                                             loginCounts,
                                             clvDates,
                                             clvValues,
                                         }: TimeSeriesDataProps) {
    // New Customers Line Chart Data
    const newCustomersData = {
        labels: newCustomerDates,
        datasets: [
            {
                label: 'New Customers',
                data: newCustomerCounts,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Customer Churn Rate Line Chart Data
    const churnRateData = {
        labels: churnRateDates,
        datasets: [
            {
                label: 'Churn Rate (%)',
                data: churnRates,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Logins Over Time Line Chart Data
    const loginsData = {
        labels: loginDates,
        datasets: [
            {
                label: 'Logins',
                data: loginCounts,
                borderColor: '#4BC0C0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Customer Lifetime Value (CLV) Line Chart Data
    const clvData = {
        labels: clvDates,
        datasets: [
            {
                label: 'Customer Lifetime Value (CLV)',
                data: clvValues,
                borderColor: '#FFCE56',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Customers Line Chart */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">New Customers Over Time</h3>
                <Line data={newCustomersData} />
            </div>

            {/* Customer Churn Rate Line Chart */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Customer Churn Rate</h3>
                <Line data={churnRateData} />
            </div>

            {/* Logins Over Time Line Chart */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Logins Over Time</h3>
                <Line data={loginsData} />
            </div>

            {/* Customer Lifetime Value (CLV) Line Chart */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Customer Lifetime Value (CLV) Over Time</h3>
                <Line data={clvData} />
            </div>
        </div>
    );
}
