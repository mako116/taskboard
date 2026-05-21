import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export function ThemeSync() {
  const theme = useAppSelector((s) => s.ui.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);
  return null;
}
