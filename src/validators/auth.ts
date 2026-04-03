import { t } from "elysia";

export const signupSchema = t.Object({
    email: t.String({ format: "email" }),
    password: t.String({ minLength: 6 }),
    username: t.String({ minLength: 3 }),
});

export const loginSchema = t.Object({
    email: t.String({ format: "email" }),
    password: t.String({ minLength: 6 }),
});