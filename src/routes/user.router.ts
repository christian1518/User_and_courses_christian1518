import { Router } from "express";
import { createUserController, readCourseUserController, readUserController } from "../controllers/user.controllers";
import { validateBody } from "../middlewares/validateBody.middlewares";
import { userCreateSchema } from "../schemas/user.schema";
import { verifyToken } from "../middlewares/verify.token.middlewares";
import { verifyPermission } from "../middlewares/verifyPermission.middlewares";
import { uniqueEmail } from "../middlewares/uniqueEmail.middlewares";
import { validateAdmin } from "../middlewares/validateAdmin.middlewares";

export const userRouter: Router = Router()

userRouter.post("", validateBody(userCreateSchema), uniqueEmail, createUserController)
userRouter.get("", verifyToken, validateAdmin, verifyPermission, readUserController)

userRouter.get("/:userId/courses", verifyToken, validateAdmin, verifyPermission, readCourseUserController)
