// src/components/SatisfactionMetrics.tsx
"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SatisfactionMetricsProps {
    csatScore: number;
    npsScore: number;
}

export default function SatisfactionMetrics({ csatScore, npsScore }: SatisfactionMetricsProps) {
    // Normalize CSAT score to a percentage (0-100%)
    const csatPercentage = Math.min(Math.max((csatScore / 10) * 100, 0), 100);

    // CSAT Gauge Data
    const csatData = {
        labels: ["CSAT Score", "Remaining"],
        datasets: [
            {
                data: [csatPercentage, 100 - csatPercentage],
                backgroundColor: ["#00C9FF", "#1C1C1C"],
                hoverBackgroundColor: ["#00C9FF", "#1C1C1C"],
                borderWidth: 0,
            },
        ],
    };

    const csatOptions = {
        responsive: true,
        cutout: "85%",
        rotation: 270,
        circumference: 180,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => `CSAT: ${csatPercentage.toFixed(1)}%`,
                },
            },
        },
    };

    // NPS Gauge Data
    const npsPercentage = Math.min(Math.max((npsScore + 100) / 200 * 100, 0), 100); // Scale NPS from -100 to +100
    const npsData = {
        labels: ["NPS Score", "Remaining"],
        datasets: [
            {
                data: [npsPercentage, 100 - npsPercentage],
                backgroundColor: ["#FF007F", "#1C1C1C"],
                hoverBackgroundColor: ["#FF007F", "#1C1C1C"],
                borderWidth: 0,
            },
        ],
    };

    const npsOptions = {
        responsive: true,
        cutout: "85%",
        rotation: 270,
        circumference: 180,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => `NPS: ${npsScore}`,
                },
            },
        },
    };

    return (
        <div className="flex justify-between space-x-12">
            {/* CSAT Gauge Card */}
            <div
                className="relative w-72 h-72 p-4 bg-gradient-to-br from-blue-800 to-cyan-700 rounded-3xl shadow-2xl ring-4 ring-cyan-300">
                <h3 className="text-lg font-bold mb-4 text-center text-gray-100">Customer Satisfaction (CSAT)</h3>
                <div className="relative flex items-center justify-center">
                    <Doughnut
                        data={csatData}
                        options={{
                            ...csatOptions,
                            plugins: {
                                ...csatOptions.plugins,
                                tooltip: {enabled: false}, // Disable default tooltip
                            },
                        }}
                    />
                    <div className="absolute">
                        <p className="text-3xl font-bold text-cyan-200">{csatPercentage.toFixed(2)}%</p>
                    </div>
                </div>
            </div>

            {/* NPS Gauge Card */}
            <div
                className="relative w-72 h-72 p-4 bg-gradient-to-br from-pink-800 to-red-600 rounded-3xl shadow-2xl ring-4 ring-pink-300">
                <h3 className="text-lg font-bold mb-4 text-center text-gray-100">Net Promoter Score (NPS)</h3>
                <div className="relative flex items-center justify-center">
                    <Doughnut
                        data={npsData}
                        options={{
                            ...npsOptions,
                            plugins: {
                                ...npsOptions.plugins,
                                tooltip: {enabled: false}, // Disable default tooltip
                            },
                        }}
                    />
                    <div className="absolute">
                        <p className="text-3xl font-bold text-pink-200">{npsScore.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
