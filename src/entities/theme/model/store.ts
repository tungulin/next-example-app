import { create } from "zustand";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

interface ThemeStore {
  theme: Theme;
  onToggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: Theme.LIGHT,
  onToggleTheme: () =>
    set((state) => ({
      theme: state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    })),
}));
