import { Router } from "express";
import { userRouter } from "./user.router";
import { sessionRouter } from "./session.router";
import { courseRouter } from "./course.router";

export const routes: Router = Router()

routes.use("/users", userRouter)
routes.use("/login", sessionRouter)
routes.use("/courses", courseRouter)