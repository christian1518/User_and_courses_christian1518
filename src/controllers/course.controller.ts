import { Request, Response } from "express";
import { addUserToCourseService, courseCreateService, coursesReadAllService, deleteUserFromCourseService, readUsersByCoursesService } from "../services/course.services";
import { CourseRead } from "../interfaces/course.interface";

export const courseCreateController = async (req: Request, res: Response): Promise<Response> => {
    const newCourse = await courseCreateService(req.body)

    return res.status(201).json(newCourse)
}

export const coursesReadAllController = async (req: Request, res: Response): Promise<Response> => {
    const courses: CourseRead = await coursesReadAllService()

    return res.status(200).json(courses)
}

export const addUsertoCourseController = async ( req: Request, res: Response): Promise<Response> => {
    const {userId, courseId} = req.params

    await addUserToCourseService(userId, courseId)

    return res.status(201).json({message: "User successfully vinculed to course"})
}

export const deleteUserFromCourseController = async ( req: Request, res: Response): Promise<Response> => {
    const {userId, courseId} = req.params

    await deleteUserFromCourseService(userId, courseId)

    return res.status(204).json()
}


export const readUsersByCoursesController = async (req: Request, res: Response): Promise<Response> => {
    const users = await readUsersByCoursesService(req.params.courseId)

    return res.status(200).json(users)
}
