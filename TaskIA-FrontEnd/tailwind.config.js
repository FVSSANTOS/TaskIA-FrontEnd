export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: ['sidebar main'] // uma linha com duas colunas
      },
      colors: {
        /* =========================
         * SHADCN TOKENS (ESSENCIAL)
         * ========================= */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",

        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",

        /* =========================
         * SEU TEMA ATUAL (MANTIDO)
         * ========================= */
        brand: "#6366F1",
        "on-primary": "#FFFFFF",
        "primary-container": "#E0E7FF",

        surface: "#FFFBFE",
        "surface-container": "#F3F0F2",

        error: "#F32424",
      },
    },
  },
  plugins: [],
}