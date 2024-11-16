# BullTech Dashboard

Welcome to the **BullTech Dashboard**, a powerful and modern analytics application built with **Next.js**, **React**, **Tailwind CSS**, and **Prisma**. This project features a sleek, futuristic design with dynamic charts, dark and light themes, and interactive UI elements for a great user experience.

## 🚀 Features

- **User Authentication**: Cookie-based login system for secure access.
- **Dark and Light Modes**: Persistent theme state with smooth toggling.
- **Data Visualization**: Beautiful charts using **Chart.js** with 3D-like effects.
- **Responsive Design**: Mobile-friendly UI with glassmorphic elements.
- **State Management**: Efficient use of React state and cookies for theme and authentication.

---

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Data Visualization**: Chart.js
- **Database**: Prisma ORM (connected to your database)
- **State Management**: React State, Nookies (for cookies)

---

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **Git**

---

## 🗂️ Git Ignore Updates

The `.gitignore` file has been updated to simplify the setup process. However, you will need to provide the following files yourself:

- `.env.local` (environment variables)
- Custom fonts (if any are not included in the repository)

---

## 📋 Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/digidmn/bulltech-dashboard.git
cd bulltech-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root of the project with the following content:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_THEME=dark

# Prisma Database Connection (Example)
DATABASE_URL=mysql://username:password@localhost:3306/mydatabase
```

### Step 4: Run Prisma Migrations

Ensure your database is set up and run the migrations:

```bash
npx prisma migrate dev
```

### Step 5: Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## ⚙️ Scripts

- **Development**: `npm run dev` - Starts the development server.
- **Production Build**: `npm run build` - Builds the project for production.
- **Start**: `npm run start` - Starts the production server.
- **Lint**: `npm run lint` - Checks code for linting errors.
- **Prisma Studio**: `npx prisma studio` - Opens Prisma Studio for database management.

---

## 🌐 Deployment

The easiest way to deploy your Next.js app is through **Vercel**:

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and import the project from GitHub.
3. Set the environment variables in the Vercel dashboard.
4. Deploy your application.

Alternatively, you can deploy to **Netlify**, **AWS Amplify**, or any platform that supports Node.js.

---

## 🗄️ Directory Structure

```plaintext
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main Dashboard Page
│   └── layout.tsx            # Root Layout with Theme Handling
├── components/
│   ├── Footer.tsx            # Footer Component
│   ├── Navbar.tsx            # Navbar Component
│   └── dashboard/
│       ├── SimpleMetrics.tsx
│       ├── TimeSeriesCharts.tsx
│       ├── DistributionCharts.tsx
│       ├── StatusCharts.tsx
│       └── SatisfactionMetrics.tsx
├── styles/
│   └── globals.css           # Global Styles
├── utils/
│   └── theme.ts              # Theme Management Utilities
public/
├── fonts/
│   ├── GeistVF.woff
│   └── GeistMonoVF.woff
```

---

## 🌙 Theme Management

The project supports persistent theme toggling between dark and light modes:

1. The theme state is managed with a cookie (`theme`) using **Nookies**.
2. Users can toggle the theme via the navbar button.
3. The theme is applied automatically on page load based on the cookie value.

Example utility function:

```typescript
import { setCookie, parseCookies } from 'nookies';

export const toggleDarkMode = (isDarkMode: boolean, setIsDarkMode: Function) => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setCookie(null, 'theme', newMode ? 'dark' : 'light', { maxAge: 30 * 24 * 60 * 60, path: '/' });
    document.documentElement.classList.toggle('dark', newMode);
};
```

---

## 🛡️ Authentication

The project uses simple cookie-based authentication. A middleware (`middleware.ts`) handles redirection for protected routes like the dashboard.

Example middleware:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';
    if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
}
```

---

## 📊 Data Visualization

The dashboard includes various interactive charts built with **Chart.js**:

- **Doughnut Charts**: For ticket status and resolution rate.
- **Bar Charts**: For user distribution and ticket backlog.
- **Line Charts**: For login trends over time.

The charts are styled with gradients and shadows for a modern look.

---

## 📝 Known Issues

1. **Theme Flash**: There might be a brief flash of the incorrect theme on page load. This can be mitigated by server-side theme detection.
2. **Cookie Expiry**: Ensure cookies have appropriate expiration times to maintain user preferences.

---

## 🤝 Contributing

1. **Fork** the repository.
2. Create a **new branch**: `git checkout -b feature/your-feature-name`.
3. **Commit your changes**: `git commit -m 'Add feature'`.
4. **Push to the branch**: `git push origin feature/your-feature-name`.
5. Open a **pull request**.

---

## 🛡️ License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 💬 Contact

For any questions or feedback, please contact [support@bulltechgroup.co.za](mailto:support@bulltechgroup.co.za).

---

Enjoy building with BullTech Dashboard! 🚀
