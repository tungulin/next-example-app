'use client';

import React, { ReactNode } from 'react';

import { Box, List, rem } from '@mantine/core';

import classes from './Navbar.module.css';
import Link from 'next/link';

interface Option {
    key: string;
    value: string;
    icon?: ReactNode;
    active?: boolean;
}

interface Props {
    options: Option[];
}

export const Navbar = ({ options }: Props) => {
    return (
        <Box p={rem(10)} className={classes.root}>
            <List className={classes.list} listStyleType="none">
                {options.map(option => (
                    <List.Item
                        key={option.key}
                        icon={option.icon}
                        renderRoot={props => (
                            <Link href={option.key} {...props} />
                        )}
                        classNames={{
                            item: classes.listItem,
                            itemIcon: classes.listItemIcon,
                        }}
                        data-active={option.active || undefined}
                        w={'100%'}
                        h={40}
                    >
                        {option.value}
                    </List.Item>
                ))}
            </List>
        </Box>
    );
};
