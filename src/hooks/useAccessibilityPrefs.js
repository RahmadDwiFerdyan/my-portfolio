import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "portfolio-accessibility-prefs";

const DEFAULT_PREFS = {
  theme: "dark",
};

export default function useAccessibilityPrefs() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const lastThemeRef = useRef(DEFAULT_PREFS.theme);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setPrefs((prev) => ({ ...prev, ...parsed }));
    } catch {
      // Ignore malformed user storage and continue with defaults.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = prefs.theme;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  useEffect(() => {
    if (lastThemeRef.current === prefs.theme) return;

    const root = document.documentElement;
    root.classList.add("theme-switching");
    const timer = window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 380);

    lastThemeRef.current = prefs.theme;
    return () => window.clearTimeout(timer);
  }, [prefs.theme]);

  const actions = useMemo(
    () => ({
      toggleTheme: () => {
        setPrefs((prev) => ({
          ...prev,
          theme: prev.theme === "dark" ? "light" : "dark",
        }));
      },
    }),
    [],
  );

  return { prefs, ...actions };
}
