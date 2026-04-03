
import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth";
import { loggerMiddleware } from "./middlewares/logger";
import { errorMiddleware } from "./middlewares/error";
import { authMiddleware } from "./middlewares/auth";
import { postRoutes } from "./routes/post";
const app = new Elysia()
  .use(loggerMiddleware)
  .use(errorMiddleware)
  .use(authRoutes)
  .use(authMiddleware)
  .use(postRoutes)
  .listen(3000);

console.log("Server running on http://localhost:3000");