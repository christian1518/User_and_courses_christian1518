import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middlewares";
import { courseCreateSchema } from "../schemas/course.schema";
import { addUsertoCourseController, courseCreateController, coursesReadAllController, deleteUserFromCourseController, readUsersByCoursesController } from "../controllers/course.controller";
import { verifyToken } from "../middlewares/verify.token.middlewares";
import { validateAdmin } from "../middlewares/validateAdmin.middlewares";
import { verifyPermission } from "../middlewares/verifyPermission.middlewares";
import { validateUserIdExists } from "../middlewares/validateUserIdExists.middlewares";
import { validateCourseIdExists } from "../middlewares/validateCourseIdExists.middlwares";

export const courseRouter: Router = Router()

courseRouter.post("", validateBody(courseCreateSchema),verifyToken, validateAdmin, verifyPermission, courseCreateController)
courseRouter.get("", coursesReadAllController)

courseRouter.post("/:courseId/users/:userId", verifyToken, validateAdmin, verifyPermission, validateUserIdExists, validateCourseIdExists, addUsertoCourseController)
courseRouter.delete("/:courseId/users/:userId", verifyToken, validateAdmin, verifyPermission, validateUserIdExists, validateCourseIdExists, deleteUserFromCourseController)

courseRouter.get("/:courseId/users",verifyToken,validateAdmin, verifyPermission, readUsersByCoursesController)
