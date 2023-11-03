import { NextFunction, Request, Response } from "express";
import { loginServices } from "../services/session.services";
import { SessionReturn } from "../interfaces/session.interface";

export const sessionController = async (req: Request, res: Response, next: NextFunction):Promise<Response> => {
    const token: SessionReturn = await loginServices(req.body)

    return res.status(200).json(token)
}