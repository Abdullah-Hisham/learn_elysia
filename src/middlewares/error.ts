
import { Elysia } from "elysia";

export const errorMiddleware = new Elysia()
.onError(({ code, error, set }) => {
    set.status = 400;

    return {
        success: false,
        message: (error as Error).message || "Something went wrong",
        code,
    };
});