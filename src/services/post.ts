import { prisma } from "../../prisma/client";

export const createPostService = async (
    userId: number,
    { title, content }: { title: string; content: string }
) => {
    return await prisma.post.create({
    data: {
        title,
        content,
        authorId: userId,
    },
    });
};

export const getAllPostsService = async () => {
return await prisma.post.findMany({
    include: {
        author: {
        select: {
            id: true,
            username: true,
        },
        },
    },
});
};

export const getPostByIdService = async (id: number) => {
    const post = await prisma.post.findUnique({
    where: { id },
    include: {
        author: {
        select: {
            id: true,
            username: true,
        },
        },
    },
});

if (!post) throw new Error("Post not found");

    return post;
};

export const updatePostService = async (
    userId: number,
    postId: number,
    data: { title?: string; content?: string }
) => {
    const post = await prisma.post.findUnique({
    where: { id: postId },
    });

    if (!post) throw new Error("Post not found");

    if (post.authorId !== userId) {
    throw new Error("Unauthorized");
    }

    return await prisma.post.update({
    where: { id: postId },
    data,
    });
};

export const deletePostService = async (
    userId: number,
    postId: number
) => {
    const post = await prisma.post.findUnique({
    where: { id: postId },
});

    if (!post) throw new Error("Post not found");

    if (post.authorId !== userId) { 
    throw new Error("Unauthorized");
}

    await prisma.post.delete({
    where: { id: postId },
    });

    return { message: "Post deleted successfully" };
};