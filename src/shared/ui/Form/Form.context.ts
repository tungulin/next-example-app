import { createBareContext } from '@/shared/libs/createBareContext';
import type { UseFormReturnType } from '@mantine/form';

const [FormProvider, _useFormContext] = createBareContext();

const useFormContext = _useFormContext as <T>() => UseFormReturnType<T>;

export { FormProvider, useFormContext };
