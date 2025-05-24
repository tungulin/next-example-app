import React from "react";
import { Modal, Button, Stack, Text, Flex } from "@mantine/core";
import Form from "@/shared/ui/Form";
import { useForm } from "@mantine/form";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { RegistryUserOutputSchema, RegistryUserSchema } from "../schema";
import { useUnmount } from "@/shared/hooks";
import { userApi } from "@/entities/user";
import { notifications } from "@mantine/notifications";

interface Props {
  opened: boolean;
  onClose: () => void;
  onClickAuth: () => void;
}

export const RegistryModal = (props: Props) => {
  const { opened, onClose, onClickAuth } = props;

  const form = useForm({
    validate: valibotResolver(RegistryUserSchema),
  });

  const handleSubmitForm = (values: RegistryUserOutputSchema) => {
    userApi.registry(values).then(() => {
      notifications.show({
        color: "green",
        message: "Registration was successful!",
      });
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
      h={300}
    >
      <Form form={form} onSubmit={handleSubmitForm}>
        <Stack>
          <Form.Input name="login" label="Login" />
          <Form.PasswordInput name="password" label="Password" />
          <Form.PasswordInput name="repeatPassword" label="Repeat password" />
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
          style={{ cursor: "pointer" }}
          td="underline"
        >
          Login
        </Text>
      </Flex>
    </Modal>
  );
};
