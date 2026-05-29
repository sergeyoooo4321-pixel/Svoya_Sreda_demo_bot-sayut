import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"]
      },
      colors: {
        ink: "#1f2420",
        graphite: "#33413a",
        sage: "#5e6f64",
        moss: "#7a8b72",
        clay: "#ad6b45",
        rust: "#8d4f36",
        mist: "#eef3ef",
        linen: "#f7f4ee",
        cloud: "#fbfaf7",
        steel: "#506176"
      },
      boxShadow: {
        soft: "0 22px 70px rgba(31, 36, 32, 0.12)",
        card: "0 16px 45px rgba(31, 36, 32, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
