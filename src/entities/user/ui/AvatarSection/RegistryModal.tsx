import React, { useState } from 'react';
import { Modal, Button, Stack, Text, Flex } from '@mantine/core';
import Form from '@/shared/ui/Form';
import { useForm } from '@mantine/form';
import { valibotResolver } from 'mantine-form-valibot-resolver';
import { RegistryUserOutputSchema, RegistryUserSchema } from '../../schema';
import { useUnmount } from '@/shared/hooks';
import { userApi, useUserActions } from '@/entities/user';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

interface Props {
    opened: boolean;
    onClose: () => void;
    onClickAuth: () => void;
}

export const RegistryModal = (props: Props) => {
    const { opened, onClose, onClickAuth } = props;
    const router = useRouter();
    const { setUser } = useUserActions();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        validate: valibotResolver(RegistryUserSchema),
    });

    const handleSubmitForm = (values: RegistryUserOutputSchema) => {
        setIsLoading(true);
        userApi
            .registry(values)
            .then(() => {
                setUser(values);
                onClose();
                notifications.show({
                    color: 'green',
                    message: 'Registration was successful!',
                });
                router.push('/profile');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useUnmount(() => {
        form.reset();
        form.clearErrors();
    });

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Registration"
            centered
            w={300}
        >
            <Form form={form} onSubmit={handleSubmitForm}>
                <Stack>
                    <Form.Input name="login" label="Login" />
                    <Form.PasswordInput name="password" label="Password" />
                    <Form.PasswordInput
                        name="repeatPassword"
                        label="Repeat password"
                    />
                    <Button type="submit" mt={10} w="100%">
                        Submit
                    </Button>
                </Stack>
            </Form>

            <Flex mt={30} gap="xs">
                <Text size="sm">Logined?</Text>
                <Text
                    onClick={onClickAuth}
                    size="sm"
                    style={{ cursor: 'pointer' }}
                    td="underline"
                >
                    Login
                </Text>
            </Flex>
        </Modal>
    );
};
