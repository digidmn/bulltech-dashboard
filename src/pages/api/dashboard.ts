// src/pages/api/dashboard-data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
    api: {
        externalResolver: true,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API request received for dashboard data...");

    // Ensure only GET requests are processed
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        // Fetch statistics from the database using Prisma
        const [
            usersCount,
            companiesCount,
            departmentsCount,
            projectsCount,
            openTickets,
            resolvedTickets,
            avgResponseTime,
            avgResolutionTime,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.company.count(),
            prisma.department.count(),
            prisma.project.count(),
            prisma.supportTicket.count({ where: { status: 'Open' } }),
            prisma.supportTicket.count({ where: { status: 'Resolved' } }),
            prisma.supportTicket.aggregate({ _avg: { responseTime: true } }),
            prisma.supportTicket.aggregate({ _avg: { resolutionTime: true } }),
        ]);

        // Example customer satisfaction score (dummy value)
        const csatScore = 85;

        // Prepare the response data
        const responseData = {
            usersCount,
            companiesCount,
            departmentsCount,
            projectsCount,
            openTickets,
            resolvedTickets,
            avgResponseTime: avgResponseTime._avg?.responseTime || 0,
            avgResolutionTime: avgResolutionTime._avg?.resolutionTime || 0,
            csatScore,
        };

        console.log("Dashboard data fetched successfully:", responseData);

        // Send the response with status 200 (OK)
        return res.status(200).json(responseData);
    } catch (error: any) {
        console.error("Error fetching dashboard data:", error.message);
        return res.status(500).json({ error: "Failed to fetch dashboard data. Please try again later." });
    } finally {
        // Disconnect Prisma client to avoid connection leaks
        await prisma.$disconnect();
    }
}
