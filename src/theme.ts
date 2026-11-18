import { defineTheme } from "@hyper-elements/react";

export const theme = defineTheme({
  colors: {
    background: "#0d1117",
    foreground: "#e6edf3",
    primary: "#238636",
    primaryForeground: "#ffffff",
    muted: "#8b949e",
    border: "#30363d",
    heat: {
      off: "#161b22",
      dim: "#0e4429",
      mid: "#26a641",
      bright: "#39d353",
    },
  },
  fonts: {
    body: "Inter, Arial, sans-serif",
  },
});