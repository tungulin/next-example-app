import { create } from "zustand";
import { useShallow } from "zustand/shallow";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

interface ThemeStore {
  theme?: Theme;
  actions: {
    initTheme: (newTheme: Theme) => void;
    onToggleTheme: () => void;
  };
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: undefined,
  actions: {
    initTheme: (newTheme) =>
      set(() => ({
        theme: newTheme,
      })),
    onToggleTheme: () =>
      set((state) => ({
        theme: state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
      })),
  },
}));

export const useThemeActions = () =>
  useThemeStore(useShallow((state) => state.actions));
