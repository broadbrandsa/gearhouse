import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "primary": "#10b981", // Emerald 500
                "primary-hover": "#059669",
                "background-dark": "#0b0f14",
                "panel-dark": "#111827",
                "panel-border": "#1f2937",
                "charcoal": "#090c11",
                "slate-gray": "#9ca3af"
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
} satisfies Config;
