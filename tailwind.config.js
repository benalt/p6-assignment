/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#f5f6f4", // light color
        light2: "#ebede9", // light color
        darkAccent : "#574d68", // dark bg accent
        alertLight: "#fedfd7",
        alertDark: "#fc7753", //alert 
        uiActive : "#cddfd9", // hover border
        uiActiveDk: "#507c6d", // link color hover
        ui: "#5b5b5b", // button decoration
        uiLight: "#b3d0d0"
      }
    }
  },
  plugins: [],
}