import { JWT_SECRET } from "../config/constants";
import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";
import { UserRoles } from "../models/User";

export const getAuthMiddleware = function (roles: UserRoles[]) {

    return (req: Request, res: Response, next: NextFunction) => {
        // Работа с токеном
        console.log("Call");

        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Authorization required" });
            return;
        }

        const token = authHeader.split(" ")[1];


        try {
            const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
            if (!roles.includes(decoded.role)) {
                res.status(403).json({ message: "Role is not applicable for endpoint" })
                return;
            }
            //@ts-ignore
            req.userRole = decoded.role
        } catch (e) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }

        // Request объект передается дальше
        next()
    }
}

export interface RequestWithAuth extends Request {
    user: {
        username: string,
        email: string,
        role: UserRoles
    }
}
