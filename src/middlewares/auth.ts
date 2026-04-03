
import { Elysia } from "elysia";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = new Elysia()
    .onBeforeHandle(async ({ request, set }) => {
    const authHeader = request.headers.get("authorization")
    
    
    if (!authHeader?.startsWith("Bearer ")) {
        set.status = 401
        return { error: "Missing token" }
    }
    const token = authHeader.split(" ")[1]
    const ok = await verifyToken(token)
    if (ok){
        return {user: ok}
    }
    if (!ok) {
        set.status = 403
        return { error: "Invalid token" }
    }
    });