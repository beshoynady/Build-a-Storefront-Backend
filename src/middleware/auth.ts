import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get("Authorization")
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const bearer = authHeader.split(' ')[0].toLowerCase()
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(token, config.token as unknown as string)
                if (decode) {
                    next();
                }
                else {
                    return res.status(401).json({
                        status: "error",
                        message: "Invalid Token."
                    })
                }
            } else {

                return res.status(401).json({
                    status: "error",
                    message: "Login Error"
                })
            }
        }
        else {
            return res.status(401).json({
                status: "error",
                message: "Login Error"
            })
        }
    } catch (error) {
        throw new Error(`Login Error ${error}`);

    }
};
export default verifyToken