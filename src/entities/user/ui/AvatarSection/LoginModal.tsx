import React, { useState } from "react";
import { Modal, Button, Stack, Text, Flex } from "@mantine/core";
import Form from "@/shared/ui/Form";
import { useForm } from "@mantine/form";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { AuthUserSchema, AuthUserOutputSchema } from "../../schema";
import { useUnmount } from "@/shared/hooks";
import { userApi, useUserActions } from "@/entities/user";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useMovieActions } from "@/entities/movie";

interface Props {
  opened: boolean;
  onClose: () => void;
  onClickRegistry: () => void;
}

export const LoginModal = (props: Props) => {
  const { opened, onClose, onClickRegistry } = props;
  const router = useRouter();
  const { setUser } = useUserActions();
  const { initFavoriteMovies } = useMovieActions();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    validate: valibotResolver(AuthUserSchema),
  });

  const handleSubmitForm = (values: AuthUserOutputSchema) => {
    setIsLoading(true);
    userApi
      .login(values)
      .then((data) => {
        const user = data?.user;
        notifications.show({
          color: "green",
          message: "Login was successful!",
        });
        setUser(values);
        initFavoriteMovies(user?.favoriteMovies || []);
        onClose();
        router.push("/profile");
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
      title="Authentication"
      centered
      w={300}
    >
      <Form form={form} onSubmit={handleSubmitForm}>
        <Stack>
          <Form.Input name="login" label="Login" />
          <Form.PasswordInput name="password" label="Password" />
          <Button type="submit" mt={10} w="100%" loading={isLoading}>
            Submit
          </Button>
        </Stack>
      </Form>

      <Flex mt={30} gap="xs">
        <Text size="sm">Not registered?</Text>
        <Text
          onClick={onClickRegistry}
          size="sm"
          style={{ cursor: "pointer" }}
          td="underline"
        >
          Register
        </Text>
      </Flex>
    </Modal>
  );
};
