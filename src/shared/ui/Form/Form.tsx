import { ReactNode } from 'react';
import { FormProvider, useFormContext } from './Form.context';
import { UseFormReturnType } from '@mantine/form';
import {
    PasswordInputProps,
    PasswordInput as UIPasswordInput,
    TextInput,
    TextInputProps,
} from '@mantine/core';

//TODO: Add type
interface FormProps {
    form: UseFormReturnType<any, any>;
    children: ReactNode;
    onSubmit: (values: ReturnType<any>) => void;
}

const useFieldMapper = (fieldName: string) => {
    const form = useFormContext();
    return {
        key: form.key(fieldName),
        hint: form.errors[fieldName],
        state: form.errors ? 'error' : undefined,
        ...form.getInputProps(fieldName),
    };
};

const Form = (props: FormProps) => {
    const { form, onSubmit, children, ...other } = props;

    return (
        <form {...other} onSubmit={form.onSubmit(values => onSubmit(values))}>
            <FormProvider value={form}>{children}</FormProvider>
        </form>
    );
};

const Input = (props: TextInputProps & { name: string }) => {
    const { name, error, ...other } = props;

    const { key, ...field } = useFieldMapper(name);
    return <TextInput key={key} {...field} {...other} />;
};

const PasswordInput = (props: PasswordInputProps & { name: string }) => {
    const { name, error, ...other } = props;

    const { key, ...field } = useFieldMapper(name);
    return <UIPasswordInput key={key} {...field} {...other} />;
};

Form.Input = Input;
Form.PasswordInput = PasswordInput;

export default Form;
