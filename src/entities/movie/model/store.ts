import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface SearchStore {
  search: string;
  actions: {
    setSearch: (newTheme: string) => void;
    clearSearch: () => void;
  };
}

export const useThemeStore = create<SearchStore>((set) => ({
  search: "",
  actions: {
    setSearch: (newSearch) =>
      set(() => ({
        search: newSearch,
      })),
    clearSearch: () =>
      set(() => ({
        search: "",
      })),
  },
}));

export const useSearchActions = () =>
  useThemeStore(useShallow((state) => state.actions));

export const useSearch = () =>
  useThemeStore(useShallow((state) => state.search));
