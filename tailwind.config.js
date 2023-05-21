/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        primaryDesktopOne: "url(/images/bg-shorten-desktop.svg)",
      },
      gridTemplateColumns: {
        logoSection: "13% 87%",
      },
    },
  },
  plugins: [],
};
