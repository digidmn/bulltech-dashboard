"use client";

import { Doughnut, Bar } from "react-chartjs-2";

interface StatusDataProps {
    ticketStatusLabels: string[];
    ticketStatusCounts: number[];
    resolutionRate: number;
    backlogCounts: number[];
    backlogLabels: string[];
}

export default function StatusCharts({
                                         ticketStatusLabels,
                                         ticketStatusCounts,
                                         resolutionRate,
                                         backlogCounts,
                                         backlogLabels,
                                     }: StatusDataProps) {
    // Data for Tickets by Status (Doughnut Chart)
    const ticketsByStatusData = {
        labels: ticketStatusLabels,
        datasets: [
            {
                data: ticketStatusCounts,
                backgroundColor: ["#065a93", "#870521", "#986d03", "#049797"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
                borderWidth: 2,
                borderColor: "#ffffff",
                hoverOffset: 8,
            },
        ],
    };

    // Data for Ticket Resolution Rate (Doughnut Chart)
    const resolutionRateData = {
        labels: ["Resolved", "Unresolved"],
        datasets: [
            {
                data: [resolutionRate, 100 - resolutionRate],
                backgroundColor: ["#038003", "#FF0000"],
                hoverBackgroundColor: ["#00FF00", "#FF0000"],
                borderWidth: 2,
                borderColor: "#ffffff",
                hoverOffset: 8,
            },
        ],
    };

    // Data for Support Ticket Backlog (Bar Chart)
    const ticketBacklogData = {
        labels: backlogLabels,
        datasets: [
            {
                label: "Tickets",
                data: backlogCounts,
                backgroundColor: ["#022c57", "#70031a"],
                borderWidth: 2,
                borderColor: "#ffffff",
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    // Chart options with dynamic text color
    const textColor = document.documentElement.classList.contains("dark") ? "#D1D5DB" : "#1F2937";

    // Options for Doughnut Charts
    const doughnutOptions = {
        responsive: true,
        cutout: "70%",
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    color: textColor,
                    font: {
                        weight: "bold",
                    },
                },
            },
            tooltip: {
                backgroundColor: textColor === "#D1D5DB" ? "#1f2937" : "#ffffff",
                titleColor: textColor === "#D1D5DB" ? "#ffffff" : "#1F2937",
                bodyColor: textColor,
            },
        },
        elements: {
            arc: {
                borderWidth: 1,
                borderColor: "#ffffff",
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.4)",
            },
        },
    };

    // Options for Bar Chart
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                    color: textColor,
                    font: {
                        weight: "bold",
                    },
                },
            },
            y: {
                stacked: true,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                    color: textColor,
                    font: {
                        weight: "bold",
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: textColor,
                },
            },
            tooltip: {
                backgroundColor: textColor === "#D1D5DB" ? "#1f2937" : "#ffffff",
                titleColor: textColor === "#D1D5DB" ? "#ffffff" : "#1F2937",
                bodyColor: textColor,
            },
        },
        elements: {
            bar: {
                borderRadius: 10,
                borderSkipped: false,
                backgroundColor: (context: { chart: any }) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return "#36A2EB";

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, "#36A2EB");
                    gradient.addColorStop(1, "#007991");
                    return gradient;
                },
                barThickness: 20,
            },
        },
    };

    const hasTicketStatusData = ticketStatusCounts.length > 0 && ticketStatusCounts.some((count) => count > 0);
    const hasBacklogData = backlogCounts.length > 0 && backlogCounts.some((count) => count > 0);
    const hasResolutionRateData = resolutionRate > 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Doughnut Chart for Tickets by Status */}
            <div className="p-6 bg-gradient-to-br from-blue-500/30 to-cyan-700/20 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/10 dark:ring-gray-800/50 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-extrabold mb-4 text-center text-cyan-700 dark:text-cyan-400 tracking-wider">
                    Tickets by Status
                </h3>
                {hasTicketStatusData ? (
                    <Doughnut data={ticketsByStatusData} options={doughnutOptions} />
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400">No Data Available</p>
                )}
            </div>

            {/* Doughnut Chart for Ticket Resolution Rate */}
            <div className="p-6 bg-gradient-to-br from-purple-500/30 to-indigo-700/20 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/10 dark:ring-gray-800/50 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-extrabold mb-4 text-center text-indigo-700 dark:text-indigo-400 tracking-wider">
                    Ticket Resolution Rate
                </h3>
                {hasResolutionRateData ? (
                    <Doughnut data={resolutionRateData} options={doughnutOptions} />
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400">No Data Available</p>
                )}
                {hasResolutionRateData && (
                    <div className="flex items-center justify-center mt-4">
                        <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                            {resolutionRate.toFixed(2)}%
                        </p>
                    </div>
                )}
            </div>

            {/* Bar Chart for Support Ticket Backlog */}
            <div className="p-6 bg-gradient-to-br from-pink-500/30 to-red-700/20 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/10 dark:ring-gray-800/50 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-extrabold mb-4 text-center text-pink-700 dark:text-pink-400 tracking-wider">
                    Support Ticket Backlog
                </h3>
                <div className="h-80">
                    {hasBacklogData ? (
                        <Bar data={ticketBacklogData} options={barOptions} />
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400">No Data Available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
