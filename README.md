# 📋 Project ReadMe for BullTech Dashboard

## BullTech Dashboard

Welcome to the **BullTech Dashboard**, a Next.js application designed for analytics and data visualization with a sleek, modern design. It features dark and light themes, interactive metrics, charts, and smooth animations.

## 🚀 Project Overview

This dashboard is built using **Next.js**, **React**, and **Tailwind CSS**, with dynamic data visualizations using **Chart.js**. It includes glassmorphic UI elements for a futuristic look.

### Key Features:

- User authentication (login with cookies).
- Dark and light theme modes with persistent state.
- Interactive analytics and data visualizations.
- Responsive design with transitions and animations.
- SQLite database setup using Prisma for data handling.

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Framework**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **State Management & Cookies**: [React State, Nookies](https://www.npmjs.com/package/nookies)
- **Database**: SQLite (via Prisma ORM)

## 📦 Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/bulltech-dashboard.git
cd bulltech-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_THEME=dark
DATABASE_URL="file:./dev.db"
```

### Step 4: Set Up the Database

Initialize the SQLite database with Prisma:

```bash
npx prisma db push
```

This command applies the database schema defined in `prisma/schema.prisma`.

### Step 5: Run the Development Server

```bash
npm run dev
```

The server will start at [http://localhost:3000](http://localhost:3000).

### Production Build

To build and start the production server:

```bash
npm run build
npm start
```

### Linting

To check for linting issues:

```bash
npm run lint
```

## 🌐 Deployment

To deploy on **Vercel**, follow these steps:

1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy the application.

## 🗄️ Directory Structure

```plaintext
bulltech-dashboard/
├── prisma/
│   └── schema.prisma       # Prisma Database Schema
├── public/
│   └── fonts/
│       ├── GeistVF.woff
│       └── GeistMonoVF.woff
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Main Dashboard Page
│   │   └── layout.tsx          # Root Layout with Theme Handling
│   ├── components/
│   │   ├── Footer.tsx          # Footer Component
│   │   ├── Navbar.tsx          # Navbar Component
│   │   └── dashboard/
│   │       ├── SimpleMetrics.tsx
│   │       ├── TimeSeriesCharts.tsx
│   │       ├── DistributionCharts.tsx
│   │       ├── StatusCharts.tsx
│   │       └── SatisfactionMetrics.tsx
│   ├── styles/
│   │   └── globals.css         # Global Styles
│   └── utils/
│       └── theme.ts            # Theme Management Utilities
├── .env.local                  # Environment Variables
├── .gitignore                  # Git Ignore Configuration
├── next.config.js              # Next.js Configuration
├── package.json                # Project Dependencies
├── README.md                   # Project Documentation
```

## 🛡️ Authentication

The project uses cookie-based authentication:

1. On login, a cookie named `authenticated` is set.
2. The dark mode preference is stored in a `theme` cookie (`dark` or `light`).
3. Middleware in `middleware.ts` handles protected routes (e.g., `/dashboard`).

## ⚙️ Middleware

The `middleware.ts` file redirects unauthenticated users to the login page when accessing protected routes:

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';
    if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
```

## 🌙 Theme Management

- The theme preference is stored in a cookie (`theme`).
- On page load, the theme is applied based on the cookie value.
- Users can toggle the theme using a button in the navbar.

**Theme Utility (`src/utils/theme.ts`):**

```ts
import { setCookie, parseCookies } from 'nookies';

export const toggleDarkMode = (isDarkMode: boolean, setIsDarkMode: Function) => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setCookie(null, 'theme', newMode ? 'dark' : 'light', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });
    document.documentElement.classList.toggle('dark', newMode);
};
```

## 📊 Charts

The project uses **Chart.js** for data visualizations:

- **Doughnut Charts** for ticket status and resolution rate.
- **Bar Charts** for user distribution and ticket backlog.
- **Line Charts** for time series data like logins over time.

## 📝 Known Issues

1. **Theme Flash**: A brief flash of the incorrect theme may occur on initial load. This can be mitigated by using server-side theme detection.
2. **Cookie Expiry**: Ensure cookies have an appropriate expiration time to maintain user preferences.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Contact

For any questions or feedback, please contact [support@bulltechgroup.co.za](mailto:support@bulltechgroup.co.za).

---

Happy Coding! 🚀
