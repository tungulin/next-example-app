'use client';

import React, { ReactNode } from 'react';
import { ThemeButton } from '@/features/toggle-theme';
import { Box, Flex, rem, Title } from '@mantine/core';

import classes from './Header.module.css';
import { useRouter } from 'next/navigation';

interface Props {
    leftSlot?: ReactNode;
    rightSlot?: ReactNode;
    text?: string;
}

export const Header = ({ leftSlot, rightSlot, text }: Props) => {
    const router = useRouter();

    const hadnleClickCenter = () => router.push('/');

    return (
        <Flex
            p={rem(10)}
            className={classes.root}
            justify="space-between"
            align="center"
        >
            <Box w="30%">{leftSlot}</Box>
            <Flex justify="center" w="40%">
                <Title
                    style={{ cursor: 'pointer' }}
                    onClick={hadnleClickCenter}
                    order={2}
                >
                    {text ? text : 'Next example app'}
                </Title>
            </Flex>
            <Flex justify="right" w="30%">
                <Flex align="center" gap="xl">
                    <ThemeButton />
                    {rightSlot}
                </Flex>
            </Flex>
        </Flex>
    );
};
