import { Elysia } from "elysia";
import { signupService, loginService } from "../services/auth";
import { signupSchema, loginSchema } from "../validators/auth";
export const authRoutes = new Elysia({ prefix: "/auth" }).guard({
    body: signupSchema
})
.post("/signup", ({ body }:any) => signupService(body ))
.guard({
    body: loginSchema
})
.post("/login", ({ body }:any) => loginService(body ));