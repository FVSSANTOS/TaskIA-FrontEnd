/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: "#6366F1",
        "on-primary": "#FFFFFF",
        "primary-container": "#E0E7FF",
        "on-primary-container": "#1E1B4B",
        
        // Surface colors
        surface: "#FFFBFE",
        "surface-dim": "#F8F6F7",
        "surface-bright": "#FFFBFE",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F8F6F7",
        "surface-container": "#F3F0F2",
        "surface-container-high": "#EDEAEC",
        "surface-container-highest": "#E8E5E7",
        "on-surface": "#1C1B1F",
        "on-surface-variant": "#49454F",
        
        // Error colors
        error: "#F32424",
        "on-error": "#FFFFFF",
      },
      fontSize: {
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        "label-md": ["12px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      fontFamily: {
        headline: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
      width: {
        "sidebar-width": "280px",
      },
      spacing: {
        sidebar: "280px",
      },
    },
  },
  plugins: [],
}

