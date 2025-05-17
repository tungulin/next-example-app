import * as v from "valibot";

export const AuthUserSchema = v.object({
  login: v.pipe(
    v.optional(v.string(), ""),
    v.string(),
    v.nonEmpty("Field is required"),
    v.minLength(5, "Login should have at least 6 letters")
  ),
  password: v.pipe(
    v.optional(v.string(), ""),
    v.string(),
    v.nonEmpty("Field is required"),
    v.minLength(8, "Password should have at least 6 letters")
  ),
});

export type AuthUserOutputSchema = v.InferOutput<typeof AuthUserSchema>;
