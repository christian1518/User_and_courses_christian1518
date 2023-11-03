import { Request, Response } from "express";
import { User, UserRead, UserReturn } from "../interfaces/user.interface";
import { createUserService, readCourseUserService, readUserService } from "../services/user.services";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createUserService(req.body)

    return res.status(201).json(user)
}

export const readUserController = async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await readUserService()
    return res.status(200).json(users)
}


export const readCourseUserController = async (req: Request, res: Response): Promise<Response> => {
    const course = await readCourseUserService(req.params.userId)

    return res.status(200).json(course)
}

