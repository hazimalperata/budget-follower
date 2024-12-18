import type {Config} from "tailwindcss";
import {PluginAPI} from "tailwindcss/types/config";
import colors from "tailwindcss/colors";

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: colors.black,
          500: "#414141",
          700: "#1C1C1E",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      zIndex: {
        'overlay': '1000',
        'dropdown': '2000',
        'modal': '3000',
      },
    },
  },
  plugins: [
    function ({addBase, theme}: PluginAPI) {
      function extractColorVars(colorObj: Record<string, string | Record<string, string>>, colorGroup = ''): Record<string, string> {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable = colorKey === "DEFAULT" ? `--color${colorGroup}` : `--color${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === 'string'
              ? {[cssVariable]: value}
              : extractColorVars(value, `-${colorKey}`);

          return {...vars, ...newVars};
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    }
  ],
} satisfies Config;
