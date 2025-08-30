'use client';

import { AvatarSection, useUser } from '@/entities/user';
import { Header, Navbar } from '@/shared/layouts';
import { Box, Button, Flex, ScrollArea, Text } from '@mantine/core';
import { IconStar, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const NAVBAR_OPTIONS = [
    {
        key: 'profile',
        value: 'Profile',
        icon: <IconUser size={20} />,
        active: true,
    },
    {
        key: 'favorite',
        value: 'Your favorite movies',
        icon: <IconStar size={20} />,
    },
];

export default function Profile() {
    const user = useUser();

    return (
        <ScrollArea>
            <Header
                text="Next example app | Profile"
                leftSlot={
                    <Button component={Link} href="/">
                        All movies
                    </Button>
                }
                rightSlot={<AvatarSection />}
            />
            <Flex h="calc(100vh - 60px)">
                <Navbar options={NAVBAR_OPTIONS} />
                <Box w="100%" p="lg">
                    <Text>Login: {user?.login}</Text>
                </Box>
            </Flex>
        </ScrollArea>
    );
}
