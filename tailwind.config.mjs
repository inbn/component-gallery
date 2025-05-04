import defaultTheme from "tailwindcss/defaultTheme";

/* @link /* @link https://utopia.fyi/type/calculator?c=320,16,1.125,1280,20,1.225,7,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */

/*
https://colorbox.io/?c0=%26p%24s%24%3D11%26p%24h%24st%24%3D359%26p%24h%24e%24%3D16%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.03%26p%24sa%24e%24%3D0.05%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqto%26p%24b%24st%24%3D0.98%26p%24b%24e%24%3D0.12%26p%24b%24c%24%3Dl%26o%24ms%24%3D0%2C9%26o%24n%24%3DPampas%26o%24lockHex%24%3Df7f5f2%26o%24ro%24%3Dcw

[
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 359,
        "end": 16,
        "curve": "easeOutQuad"
      },
      "saturation": {
        "start": 0.03,
        "end": 0.05,
        "rate": 1,
        "curve": "easeOutQuart"
      },
      "brightness": {
        "start": 0.98,
        "end": 0.12,
        "curve": "linear"
      }
    },
    "options": {
      "minorSteps": [
        0,
        9
      ],
      "name": "Pampas",
      "lockHex": "f7f5f2",
      "rotation": "clockwise"
    }
  }
]
*/

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(var(--color-border-primary), var(--color-bg-primary))",
        "linear-gradient":
          "linear-gradient(to bottom, var(--color-bg-primary), var(--color-border-primary) var(--fade-size))",
      },
      borderColor: {
        DEFAULT: "var(--color-border-primary)",
      },
      boxShadow: {
        border: "0 0 0 1px var(--color-border-primary)",
      },
      colors: {
        grey: {
          0: "#f7f5f2",
          0.5: "#eceae6",
          1: "#e2dfdb",
          2: "#ccc9c5",
          3: "#b6b3af",
          4: "#a09d9a",
          5: "#8b8885",
          6: "#757270",
          7: "#5f5d5b",
          8: "#4a4846",
          9: "#343232",
          9.5: "#292827",
          10: "#1f1d1d",
        },
        pampas: "#f7f5f2",
        red: "#d95151",
        "background-primary": "var(--color-bg-primary)",
        "background-secondary": "var(--color-bg-secondary)",
        "background-highlight": "var(--color-bg-highlight)",
        "background-highlight-invert": "var(--color-bg-highlight-invert)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-highlight": "var(--color-text-highlight)",
        "text-highlight-invert": "var(--color-text-highlight-invert)",
        "border-primary": "var(--color-border-primary)",
        "border-highlight": "var(--color-border-highlight)",
      },
      fontFamily: {
        serif: [
          "Instrument Serif",
          "Adjusted Georgia Fallback",
          ...defaultTheme.fontFamily.serif,
        ],
        sans: ["Instrument Sans", ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      letterSpacing: {
        wideish: "0.0075em",
      },
      spacing: {
        18: "72px",
      },
    },
    fontSize: {
      xs: "clamp(0.7901rem, 0.7758rem + 0.0714vw, 0.833rem)",
      sm: "clamp(0.8889rem, 0.845rem + 0.2192vw, 1.0204rem)",
      base: "clamp(1rem, 0.9167rem + 0.4167vw, 1.25rem)",
      lg: [
        "clamp(1.125rem, 0.9896rem + 0.6771vw, 1.5313rem)",
        {
          lineHeight: 1.33,
        },
      ],
      xl: [
        "clamp(1.2656rem, 1.0622rem + 1.0169vw, 1.8758rem)",
        {
          lineHeight: 1.25,
        },
      ],
      "2xl": [
        "clamp(1.4238rem, 1.1325rem + 1.4567vw, 2.2978rem)",
        {
          lineHeight: 1.125,
        },
      ],
      "3xl": "clamp(1.6018rem, 1.1975rem + 2.0217vw, 2.8148rem)",
      "4xl": "clamp(1.802rem, 1.2533rem + 2.7436vw, 3.4482rem)",
      "5xl": [
        "clamp(2.0273rem, 1.295rem + 3.6612vw, 4.224rem)",
        {
          lineHeight: 1,
        },
      ],
      "6xl": [
        "clamp(2.2807rem, 1.3161rem + 4.8229vw, 5.1744rem)",
        {
          lineHeight: 1,
        },
      ],
    },
  },
  darkMode: "selector",
  plugins: [],
};
