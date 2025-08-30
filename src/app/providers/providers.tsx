'use client';

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { themeConfig } from '../theme';
import { MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { useCookiesNext } from 'cookies-next';
import { THEME } from '@/shared/constants/default';
import { Theme } from '@/features/toggle-theme';
import { AuthProvider } from './AuthProvider';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export const Providers = ({ children }: PropsWithChildren) => {
    const queryClient = getQueryClient();
    const cookies = useCookiesNext();
    const theme = (cookies.getCookie(THEME) || 'light') as Theme;

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={themeConfig} forceColorScheme={theme}>
                <AuthProvider>{children}</AuthProvider>
            </MantineProvider>
        </QueryClientProvider>
    );
};
