import User from "../models/User";
import type { Response, Request } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/constants"
import bcrypt from "bcryptjs"

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { password, ...userData } = req.body;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ ...userData, password: hashedPassword });
            await user.save();
            res.status(201).json(user);
        } else {
            res.status(400).json({ message: "Password is required" });
        }
    } catch (e) {
        res.status(400).json({ message: (e as Error).message })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (e) {
        res.status(400).json({ message: (e as Error).message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            res.status(404).json({ message: "Error deleting user" });
        }

        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ message: (e as Error).message })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { userId, password, ...rest } = req.body
    try {
        const updateData = { ...rest }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updateUser) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updateUser);
    } catch (e) {
        res.status(400).json({ message: (e as Error).message })
    }
}
