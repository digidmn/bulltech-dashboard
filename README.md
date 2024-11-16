This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## 📋 Project ReadMe for BullTech Dashboard

# BullTech Dashboard

Welcome to the **BullTech Dashboard**, a Next.js application for analytics and data visualization with a sleek, modern design, utilizing dark and light themes, and offering various metrics, charts, and animations.

## 🚀 Project Overview

This dashboard is built using **Next.js** (App Router), **React**, and **Tailwind CSS**. It features dynamic data visualizations using **Chart.js**, enhanced with modern, futuristic, glassmorphic UI elements.

Key Features:
- User authentication (login with cookies).
- Dark and light theme modes with persistent state.
- Interactive metrics and charts for various analytics.
- Responsive design with animations and transitions.
- Data fetching and API integration.

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Framework**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **State Management & Cookies**: [React State, Nookies](https://www.npmjs.com/package/nookies)

## 📦 Installation

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x or yarn >= 1.22.x

### Clone the Repository

```bash
git clone https://github.com/yourusername/bulltech-dashboard.git
cd bulltech-dashboard
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file at the root of your project and add the following variables:

```bash
NEXT_PUBLIC_API_URL=http://your-api-url
NEXT_PUBLIC_DEFAULT_THEME=dark
```

### Fonts

The project uses custom fonts (`GeistSans` and `GeistMono`). Ensure these fonts are in the `public/fonts` directory.

## ⚙️ Running the Project

### Development Server

```bash
npm run dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

This will build the project and start the production server.

### Linting

Ensure your code follows consistent style guidelines:

```bash
npm run lint
```

## 🌐 Deployment

This project can be easily deployed on platforms like **Vercel**, **Netlify**, or **AWS Amplify**. The project is configured with Next.js' App Router, and it uses static and server-side rendering.

To deploy on **Vercel**, follow these steps:

1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy!

## 🗄️ Directory Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx        # Main Dashboard Page
│   └── layout.tsx          # Root Layout with Theme Handling
├── components/
│   ├── Footer.tsx          # Footer Component
│   ├── Navbar.tsx          # Navbar Component
│   └── dashboard/
│       ├── SimpleMetrics.tsx
│       ├── TimeSeriesCharts.tsx
│       ├── DistributionCharts.tsx
│       ├── StatusCharts.tsx
│       └── SatisfactionMetrics.tsx
├── styles/
│   └── globals.css         # Global Styles
├── utils/
│   └── theme.ts            # Theme Management Utilities
public/
├── fonts/
│   ├── GeistVF.woff
│   └── GeistMonoVF.woff
```

## 🛡️ Authentication

The project uses a simple cookie-based authentication:

1. On login, a cookie named `authenticated` is set.
2. The dark mode preference is stored in a `theme` cookie (`dark` or `light`).
3. Middleware in `src/middleware.ts` handles protected routes (e.g., `/dashboard`).

## ⚙️ Middleware

The `middleware.ts` file ensures that unauthenticated users are redirected to the login page when accessing protected routes.

Example:

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

The project features dark and light mode toggling:

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

1. **Doughnut Charts** for visualizing tickets by status and resolution rate.
2. **Bar Charts** for displaying user distribution and support ticket backlog.
3. **Line Charts** for time series data like logins over time.

Charts are enhanced with gradients, shadows, and 3D effects for a modern look.

Example:

```tsx
<Bar
    data={data}
    options={{
        scales: {
            x: {
                ticks: {
                    color: document.documentElement.classList.contains('dark') ? '#D1D5DB' : '#1F2937',
                },
            },
        },
        elements: {
            bar: {
                borderRadius: 10,
                backgroundColor: (context) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0, '#36A2EB');
                    gradient.addColorStop(1, '#007991');
                    return gradient;
                },
            },
        },
    }}
/>
```

## 📝 Known Issues

1. **Theme Flash**: On initial page load or navigation, there might be a brief flash of the wrong theme. This can be mitigated by server-side theme detection or using a loading screen.
2. **Cookie Expiry**: Ensure cookies have appropriate expiration to maintain user preferences.

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
