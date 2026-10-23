import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f8f3",
          100: "#dcefe3",
          200: "#b7ddc5",
          500: "#25965a",
          600: "#137548",
          700: "#0f5f3c",
          900: "#0b2f24"
        },
        ink: "#17211d",
        muted: "#66756e",
        surface: "#fbfdfb",
        line: "#dfe9e3",
        amber: "#c7831f"
      },
      borderRadius: {
        card: "8px"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(13, 47, 36, 0.11)",
        lift: "0 24px 70px rgba(13, 47, 36, 0.16)"
      }
    }
  },
  plugins: []
} satisfies Config;
