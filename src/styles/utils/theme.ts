// src/styles/utils/theme.ts
export const getInitialTheme = (): string => {
    if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
};

export const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === "dark") {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
};
