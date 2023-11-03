import { NextFunction, Request, Response } from "express"
import { client } from "../database"
import { CourseResult } from "../interfaces/course.interface"
import AppError from "../errors/AppError.errors"

export const validateCourseIdExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {courseId} = req.params
    
    const queryResult: CourseResult = await client.query(
        `
        SELECT * FROM "courses"
        WHERE id = $1;
        `,
        [courseId]
    )

    if (!queryResult.rows.length) {
        throw new AppError("User/course not found", 404)
    }

    res.locals = { ...res.locals, foundCourse: queryResult.rows[0] }

    return next()
}