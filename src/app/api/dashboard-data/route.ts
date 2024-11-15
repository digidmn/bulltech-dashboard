// src/app/api/dashboard-data/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Total Counts
        const usersCount = await prisma.user.count();
        const companiesCount = await prisma.company.count();
        const departmentsCount = await prisma.department.count();
        const projectsCount = await prisma.project.count();
        const openTickets = await prisma.supportTicket.count({ where: { status: 'Open' } });
        const resolvedTickets = await prisma.supportTicket.count({ where: { status: 'Resolved' } });

        // Average Response and Resolution Times
        const avgResponseTime = await prisma.supportTicket.aggregate({
            _avg: { responseTime: true },
        });
        const avgResolutionTime = await prisma.supportTicket.aggregate({
            _avg: { resolutionTime: true },
        });

        // Customer Satisfaction Score (CSAT) and Net Promoter Score (NPS)
        const csatScore = await prisma.customer.aggregate({
            _avg: { satisfactionScore: true },
        });
        const npsScore = await prisma.customer.aggregate({
            _avg: { netPromoterScore: true },
        });

        // Users per Company (Top 10 Companies)
        const usersPerCompany = await prisma.company.findMany({
            take: 10,
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });
        const companyLabels = usersPerCompany.map((company) => company.name);
        const userCountsPerCompany = usersPerCompany.map((company) => company._count.users);

        // Users per Department
        const usersPerDepartment = await prisma.department.findMany({
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });
        const departmentLabels = usersPerDepartment.map((dept) => dept.name);
        const userCountsPerDepartment = usersPerDepartment.map((dept) => dept._count.users);

        // Projects by Status
        const projectStatuses = await prisma.project.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const projectStatusLabels = projectStatuses.map((status) => status.status);
        const projectStatusCounts = projectStatuses.map((status) => status._count.id);

        // Tickets by Status
        const ticketStatuses = await prisma.supportTicket.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const ticketStatusLabels = ticketStatuses.map((status) => status.status);
        const ticketStatusCounts = ticketStatuses.map((status) => status._count.id);

        // Logins Over Time (Last 30 Days)
        const loginActivities = await prisma.loginActivity.findMany({
            where: {
                loginAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
            },
            orderBy: { loginAt: 'asc' },
        });

        const loginDates = loginActivities.map((activity) => activity.loginAt.toISOString().split('T')[0]);
        const loginCounts = loginActivities.reduce<Record<string, number>>((acc, activity) => {
            const date = activity.loginAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // New Customers Over Time (Last 30 Days)
        const newCustomers = await prisma.customer.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
            },
            orderBy: { createdAt: 'asc' },
        });

        const newCustomerDates = newCustomers.map((customer) => customer.createdAt.toISOString().split('T')[0]);
        const newCustomerCounts = newCustomerDates.reduce<Record<string, number>>((acc, date) => {
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Customer Churn Rate
        const churnedCustomersCount = await prisma.customer.count({ where: { churned: true } });
        const totalCustomersCount = await prisma.customer.count();
        const churnRate = totalCustomersCount > 0 ? (churnedCustomersCount / totalCustomersCount) * 100 : 0;

        // Customer Lifetime Value (CLV) Over Time
        const clvData = await prisma.customer.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
            },
        });

        const clvDates = clvData.map((customer) => customer.createdAt.toISOString().split('T')[0]);
        const clvValues = clvData.map((customer) => customer.netPromoterScore);

        return NextResponse.json({
            usersCount,
            companiesCount,
            departmentsCount,
            projectsCount,
            openTickets,
            resolvedTickets,
            avgResponseTime: avgResponseTime._avg?.responseTime || 0,
            avgResolutionTime: avgResolutionTime._avg?.resolutionTime || 0,
            csatScore: csatScore._avg?.satisfactionScore || 0,
            npsScore: npsScore._avg?.netPromoterScore || 0,
            companyLabels,
            userCountsPerCompany,
            departmentLabels,
            userCountsPerDepartment,
            projectStatusLabels,
            projectStatusCounts,
            ticketStatusLabels,
            ticketStatusCounts,
            loginDates,
            loginCounts: Object.values(loginCounts),
            newCustomerDates,
            newCustomerCounts: Object.values(newCustomerCounts),
            churnRate,
            clvDates,
            clvValues,
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
