import { prisma } from "../../prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { createToken } from "../utils/jwt";

export const signupService = async ({email,password,username}: {
    email: string;
    password: string;
    username: string;
}) => {
    const existingUser = await prisma.user.findUnique({
    where: { email },
    });

    if (existingUser) {
    throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
    data: {
        email,
        username,
        password: hashedPassword,
    },
    });

    const token = createToken({
    id: user.id,
    email: user.email,
    });
    
    
    return {
    user: {
        id: user.id,      
        email: user.email,
        username: user.username,
    },
    token,
};
};

export const loginService = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const user = await prisma.user.findUnique({
    where: { email },
    });

    if (!user) {
    throw new Error("Invalid credentials");
}

    const isValid = await comparePassword(password, user.password);

if (!isValid) {
    throw new Error("Invalid credentials");
    }

    const token = createToken({
    id: user.id,
    email: user.email,
    });

return {
    user: {
        id: user.id,
        email: user.email,
        username: user.username,
    },
    token,
    };
};