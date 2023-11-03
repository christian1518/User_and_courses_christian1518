import { NextFunction, Request, Response } from "express"
import { client } from "../database"
import { UserResult } from "../interfaces/user.interface"
import AppError from "../errors/AppError.errors"

export const validateUserIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {userId} = req.params

    const queryResult: UserResult = await client.query(
        `
        SELECT * FROM "users"
        WHERE id = $1;
        `,
        [userId]
    )

    if (!queryResult.rows.length) {
        throw new AppError("User/course not found", 404)
    }

    res.locals = { ...res.locals, foundUser: queryResult.rows[0] }

    return next()
}