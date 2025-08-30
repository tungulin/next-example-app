import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

interface User {
    login: string;
}

interface UserStore {
    user?: User;
    actions: {
        setUser: (user: User) => void;
        clearUser: () => void;
    };
}

export const useThemeStore = create<UserStore>(set => ({
    user: undefined,
    actions: {
        setUser: user =>
            set(() => ({
                user,
            })),
        clearUser: () => set({ user: undefined }),
    },
}));

export const useUserActions = () =>
    useThemeStore(useShallow(state => state.actions));

export const useUser = () => useThemeStore(useShallow(state => state.user));
