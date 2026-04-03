import { t } from "elysia";

export const createPostSchema = t.Object({
    title: t.String({ minLength: 3 }),
    content: t.String({ minLength: 10 }),
});

export const updatePostSchema = t.Object({
    title: t.Optional(t.String({ minLength: 3 })),
    content: t.Optional(t.String({ minLength: 10 })),
});