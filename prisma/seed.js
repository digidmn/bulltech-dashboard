const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const randomChoice = (choices) => choices[Math.floor(Math.random() * choices.length)];
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate a random date in the past 30 days
const randomDate = () => {
    const daysAgo = randomNumber(0, 30);
    const hoursAgo = randomNumber(0, 23);
    const minutesAgo = randomNumber(0, 59);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);
    date.setMinutes(date.getMinutes() - minutesAgo);
    return date;
};

async function main() {
    console.log("Seeding data...");

    // Create Companies
    const companyNames = ["BullTech Group", "Acme Corp", "Globex Industries", "Initech", "Hooli"];
    const companies = await Promise.all(
        companyNames.map((name) => prisma.company.create({ data: { name } }))
    );

    // Create Departments
    const departmentNames = ["Engineering", "Sales", "Support", "HR", "Finance"];
    const departments = [];
    for (const company of companies) {
        for (const deptName of departmentNames) {
            const department = await prisma.department.create({
                data: {
                    name: deptName,
                    companyId: company.id,
                },
            });
            departments.push(department);
        }
    }

    // Create Users
    const users = [];
    for (const company of companies) {
        for (let i = 0; i < 50; i++) {
            const department = randomChoice(departments.filter((d) => d.companyId === company.id));
            const user = await prisma.user.create({
                data: {
                    email: `user${i}@${company.name.toLowerCase().replace(" ", "")}.com`,
                    password: "password123",
                    name: `User ${i}`,
                    companyId: company.id,
                    departmentId: department.id,
                },
            });
            users.push(user);
        }
    }

    // Create Login Activities
    for (const user of users) {
        const loginCount = randomNumber(5, 20); // Each user will have between 5 and 20 login activities
        for (let i = 0; i < loginCount; i++) {
            await prisma.loginActivity.create({
                data: {
                    userId: user.id,
                    loginAt: randomDate(),
                },
            });
        }
    }

    // Create Projects
    const projectStatuses = ["Not Started", "In Progress", "Completed"];
    for (const company of companies) {
        for (let i = 0; i < 20; i++) {
            const user = randomChoice(users.filter((u) => u.companyId === company.id));
            await prisma.project.create({
                data: {
                    name: `Project ${i} - ${company.name}`,
                    status: randomChoice(projectStatuses),
                    companyId: company.id,
                    userId: user.id,
                },
            });
        }
    }

    // Create Support Tickets
    const ticketStatuses = ["Open", "In Progress", "Resolved", "Closed"];
    for (const user of users) {
        for (let i = 0; i < 10; i++) {
            await prisma.supportTicket.create({
                data: {
                    title: `Support Ticket ${i} for ${user.name}`,
                    status: randomChoice(ticketStatuses),
                    responseTime: randomNumber(1, 60),
                    resolutionTime: randomNumber(1, 120),
                    companyId: user.companyId,
                    userId: user.id,
                },
            });
        }
    }

    // Create Customers
    for (const company of companies) {
        for (let i = 0; i < 30; i++) {
            await prisma.customer.create({
                data: {
                    name: `Customer ${i} - ${company.name}`,
                    email: `customer${i}@${company.name.toLowerCase().replace(" ", "")}.com`,
                    companyId: company.id,
                    churned: Math.random() < 0.1,
                    satisfactionScore: randomNumber(1, 10),
                    netPromoterScore: randomNumber(-100, 100),
                },
            });
        }
    }

    console.log("Database seeded successfully with login activities!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
