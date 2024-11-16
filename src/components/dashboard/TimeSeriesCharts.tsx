// src/components/TimeSeriesCharts.tsx
"use client";

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

interface TimeSeriesDataProps {
    loginDates: string[];
    loginCounts: number[];
}

export default function TimeSeriesCharts({ loginDates, loginCounts }: TimeSeriesDataProps) {
    // Logins Over Time Line Chart Data
    const loginsData = {
        labels: loginDates,
        datasets: [
            {
                label: 'Logins Over Time',
                data: loginCounts,
                borderColor: '#4BC0C0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Login Count',
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `Logins: ${context.raw}`,
                },
            },
        },
    };

    return (
        <div
            className="p-6 rounded-3xl shadow-xl h-full
               bg-white/40 dark:bg-gray-900/40 backdrop-blur-md ring-1 ring-white/10 dark:ring-gray-700/50">
            <h3 className="text-2xl font-extrabold mb-4 text-center text-blue-600 dark:text-blue-400 tracking-wider">
                Logins Over Time
            </h3>
            <div className="h-96 flex items-center justify-center">
                <div
                    className="relative w-full h-full rounded-3xl shadow-inner bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg">
                    <Line data={loginsData} options={options}/>
                </div>
            </div>
        </div>
    );
}
