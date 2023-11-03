import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middlewares";
import { sessionSchema } from "../schemas/session.schema";
import { sessionController } from "../controllers/session.controller";

export const sessionRouter: Router = Router()

sessionRouter.post("", validateBody(sessionSchema), sessionController)