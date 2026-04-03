import { Elysia } from "elysia";

export const loggerMiddleware = new Elysia()
.onRequest(({ request }) => {
    console.log(`${request.method} ${request.url}`);
    });