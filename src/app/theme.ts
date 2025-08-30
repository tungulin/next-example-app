import {
    createTheme,
    MantineColorsTuple,
    DEFAULT_THEME,
    mergeMantineTheme,
} from '@mantine/core';

const primaryColor: MantineColorsTuple = [
    '#eff2ff',
    '#dfe2f2',
    '#bdc2de',
    '#99a0ca',
    '#7a84b9',
    '#6672af',
    '#5c69ac',
    '#4c5897',
    '#424e88',
    '#36437a',
];

const themeOverride = createTheme({
    defaultRadius: 10,
    primaryColor: 'blue',
    colors: {
        blue: primaryColor,
    },
});

export const themeConfig = mergeMantineTheme(DEFAULT_THEME, themeOverride);
