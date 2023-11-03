import { z } from "zod";
import { courseCreateSchema, courseReadSchema, courseSchema } from "../schemas/course.schema";
import { QueryResult } from "pg";

export type Course = z.infer<typeof courseSchema>
export type CourseCreate = z.infer<typeof courseCreateSchema>
export type CourseResult = QueryResult<Course>
export type CourseRead = z.infer<typeof courseReadSchema>