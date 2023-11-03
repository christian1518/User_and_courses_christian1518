import { NextFunction, Request, Response } from "express"
import { UserResult } from "../interfaces/user.interface"
import { client } from "../database"
import AppError from "../errors/AppError.errors"

export const uniqueEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email} = req.body

    if(!email) return next()

    const queryString: string = 'SELECT * FROM "users" WHERE "email" = $1'
    const queryResult: UserResult = await client.query(queryString, [email])


    if(queryResult.rowCount) {
        throw new AppError("Email already registered", 409)
    }

    return next()
}