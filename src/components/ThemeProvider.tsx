// src/components/ThemeProvider.tsx
"use client";

import { useEffect } from "react";
import { getInitialTheme, applyTheme } from "@/styles/utils/theme";

export default function ThemeProvider() {
    useEffect(() => {
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);
    }, []);

    return null; // This component doesn't render anything, it just handles the theme logic
}
