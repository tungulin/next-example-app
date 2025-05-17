import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Stack, Title, Text, Flex } from "@mantine/core";
import Form from "@/shared/ui/Form";
import { useForm } from "@mantine/form";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { AuthUserSchema, AuthUserOutputSchema } from "../schema";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const AuthModal = (props: Props) => {
  const { opened, onClose } = props;

  const form = useForm({
    validate: valibotResolver(AuthUserSchema),
  });

  const handleSubmitForm = (values: AuthUserOutputSchema) => {
    console.log("values", values);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Authentication"
        centered
        w={300}
        h={300}
      >
        <Form form={form} onSubmit={handleSubmitForm}>
          <Stack>
            <Form.Input name="login" label="Login" />
            <Form.PasswordInput name="password" label="Password" />
            <Button type="submit" mt={10} w="100%">
              Submit
            </Button>
          </Stack>
        </Form>

        <Flex mt={30} gap="xs">
          <Text size="sm">Not registered?</Text>
          <Text size="sm" style={{ cursor: "pointer" }} td="underline">
            Register
          </Text>
        </Flex>
      </Modal>
    </>
  );
};
