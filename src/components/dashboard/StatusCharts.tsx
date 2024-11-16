"use client";

import {Doughnut, Bar} from "react-chartjs-2";

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
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    // Data for Ticket Resolution Rate (Doughnut Chart)
    const resolutionRateData = {
        labels: ["Resolved", "Unresolved"],
        datasets: [
            {
                data: [resolutionRate, 100 - resolutionRate],
                backgroundColor: ["#00FF00", "#FF0000"],
                hoverBackgroundColor: ["#00FF00", "#FF0000"],
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
                backgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    const hasTicketStatusData = ticketStatusCounts.length > 0 && ticketStatusCounts.some((count) => count > 0);
    const hasBacklogData = backlogCounts.length > 0 && backlogCounts.some((count) => count > 0);
    const hasResolutionRateData = resolutionRate > 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Doughnut Chart for Tickets by Status */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Tickets by Status</h3>
                {hasTicketStatusData ? (
                    <Doughnut data={ticketsByStatusData}/>
                ) : (
                    <p className="text-center text-gray-500">No Data Available</p>
                )}
            </div>

            {/* Doughnut Chart for Ticket Resolution Rate */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Ticket Resolution Rate</h3>
                {hasResolutionRateData ? (
                    <Doughnut data={resolutionRateData}/>
                ) : (
                    <p className="text-center text-gray-500">No Data Available</p>
                )}
                {hasResolutionRateData && (
                    <div className="relative inset-0 flex items-center justify-center">
                        <div className="text-lg font-semibold">{resolutionRate.toFixed(2)}%</div>
                    </div>
                )}
            </div>

            {/* Bar Chart for Support Ticket Backlog */}
            {/* Bar Chart for Support Ticket Backlog */}
            <div className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
                <h3 className="text-lg font-bold mb-2">Support Ticket Backlog</h3>
                <div className="flex-1">
                    {hasBacklogData ? (
                        <Bar
                            data={ticketBacklogData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {stacked: true},
                                    y: {stacked: true},
                                },
                                plugins: {
                                    legend: {display: true, position: "top"},
                                },
                            }}
                        />
                    ) : (
                        <p className="text-center text-gray-500">No Data Available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
