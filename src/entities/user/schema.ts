import * as v from 'valibot';

export const AuthUserSchema = v.object({
    login: v.pipe(
        v.optional(v.string(), ''),
        v.string(),
        v.nonEmpty('Field is required'),
        v.minLength(5, 'Login should have at least 6 letters'),
    ),
    password: v.pipe(
        v.optional(v.string(), ''),
        v.string(),
        v.nonEmpty('Field is required'),
        v.minLength(6, 'Password should have at least 6 letters'),
    ),
});

export const RegistryUserSchema = v.pipe(
    v.object({
        login: v.pipe(
            v.optional(v.string(), ''),
            v.string(),
            v.nonEmpty('Field is required'),
            v.minLength(6, 'Login should have at least 6 letters'),
        ),
        password: v.pipe(
            v.optional(v.string(), ''),
            v.string(),
            v.nonEmpty('Field is required'),
            v.minLength(6, 'Password should have at least 6 letters'),
        ),
        repeatPassword: v.pipe(
            v.optional(v.string(), ''),
            v.string(),
            v.nonEmpty('Field is required'),
        ),
    }),
    v.forward(
        v.partialCheck(
            [['password'], ['repeatPassword']],
            input => input.password === input.repeatPassword,
            'The two passwords do not match.',
        ),
        ['repeatPassword'],
    ),
);

export type AuthUserOutputSchema = v.InferOutput<typeof AuthUserSchema>;
export type RegistryUserOutputSchema = v.InferOutput<typeof RegistryUserSchema>;
