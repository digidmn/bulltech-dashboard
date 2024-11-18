// src/components/dashboard/SimpleMetrics.tsx
"use client";

import React from 'react';
import {
    UserCircleIcon,
    BuildingOfficeIcon,
    ClipboardDocumentIcon,
    TicketIcon,
    BoltIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid';

interface MetricsProps {
    usersCount: number;
    companiesCount: number;
    projectsCount: number;
    openTickets: number;
    avgResolutionTime: number;
    avgResponseTime: number;
}

const SimpleMetrics: React.FC<MetricsProps> = ({
                                                   usersCount,
                                                   companiesCount,
                                                   projectsCount,
                                                   openTickets,
                                                   avgResolutionTime,
                                                   avgResponseTime,
                                               }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {/* Total Users */}
            <div className="relative p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Total Users</h3>
                <p className="text-3xl font-semibold">{usersCount}</p>
                <UserCircleIcon className="absolute right-4 bottom-2 w-20 h-20 text-white opacity-20" />
            </div>

            {/* Total Companies */}
            <div className="relative p-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Total Companies</h3>
                <p className="text-3xl font-semibold">{companiesCount}</p>
                <BuildingOfficeIcon className="absolute right-4 bottom-2 w-20 h-20 text-white opacity-20" />
            </div>

            {/* Total Projects */}
            <div className="relative p-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Total Projects</h3>
                <p className="text-3xl font-semibold">{projectsCount}</p>
                <ClipboardDocumentIcon className="absolute right-4 bottom-2 w-20 h-20 text-white opacity-20" />
            </div>

            {/* Open Support Tickets */}
            <div className="relative p-6 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Open Tickets</h3>
                <p className="text-3xl font-semibold">{openTickets}</p>
                <TicketIcon className="absolute right-4 bottom-2 w-20 h-20 text-white opacity-20" />
            </div>

            {/* Average Resolution Time */}
            <div className="relative p-6 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Avg Resolution Time</h3>
                <p className="text-3xl font-semibold">{avgResolutionTime} mins</p>
                <BoltIcon className="absolute right-4 bottom-2 w-20 h-20 text-white opacity-20" />
            </div>

            {/* Average Response Time */}
            <div className="relative p-6 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Avg Response Time</h3>
                <p className="text-3xl font-semibold">{avgResponseTime} mins</p>
                <ChatBubbleLeftRightIcon className="absolute right-4 bottom-2 w-20 h-20 text-white opacity-20" />
            </div>
        </div>
    );
};

export default SimpleMetrics;
