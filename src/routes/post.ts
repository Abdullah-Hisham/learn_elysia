import { Elysia } from "elysia";
import { authMiddleware } from "../middlewares/auth";
import {
    createPostService,
    getAllPostsService,
    getPostByIdService,
    updatePostService,
    deletePostService,
} from "../services/post";

import { createPostSchema 
    ,updatePostSchema
} from "../validators/post";
export const postRoutes = new Elysia({ prefix: "/posts" })

    .get("/", () => getAllPostsService())

    .get("/:id", ({ params }) => {
        return getPostByIdService(Number(params.id));
    })
    .guard({
        body: createPostSchema
    })
    .use(authMiddleware)
    .post("/", ({ body, user }:any ) => {
        return createPostService(user.id, body );
    })
.guard({
    body: updatePostSchema
    
})
    .put("/:id", ({ params, body, user }:any) => {
        return updatePostService(user.id, Number(params.id), body);
    })

    .delete("/:id", ({ params, user }:any) => {
        return deletePostService(user.id, Number(params.id));
    });