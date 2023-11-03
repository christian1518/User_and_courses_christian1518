import format from "pg-format";
import { Course, CourseCreate, CourseRead, CourseResult } from "../interfaces/course.interface";
import { client } from "../database";
import AppError from "../errors/AppError.errors";
import { UserResult } from "../interfaces/user.interface";

export const courseCreateService = async (data: CourseCreate): Promise<Course> => {
    const queryFormat: string = format(
        `INSERT INTO "courses" (%I) VALUES (%L) RETURNING*;`,
        Object.keys(data),
        Object.values(data)
    )

    const queryResult: CourseResult = await client.query(queryFormat)
    return queryResult.rows[0]
}

export const coursesReadAllService = async (): Promise<CourseRead> => {
    const queryString: string = 'SELECT * FROM "courses";'
    const queryResult: CourseResult = await client.query(queryString)

    return queryResult.rows
}

export const readUsersByCoursesService = async (courseId: string) => {
    const queryString: string = `
    SELECT
        "u"."id" "userId",
        "u"."name" "userName",
        "c"."id" "courseId",
        "c"."name" "courseName",
        "c"."description" "courseDescription",
        "uc"."active" "userActiveInCourse"
    FROM "courses" "c"
    JOIN "userCourses" "uc"
        ON "c"."id" = "uc"."courseId"
    JOIN "users" "u"
        ON "u"."id" = "uc"."userId"
    WHERE "c"."id" = $1;
    `
    const queryResult: CourseResult = await client.query(queryString, [courseId])

    if(!queryResult.rowCount) {
        throw new AppError('No user found', 404)
    }

    return queryResult.rows
}








export const addUserToCourseService = async (userId: string, courseId: string): Promise<void> =>{
    const queryString: string = `INSERT INTO "userCourses" ("userId", "courseId") VALUES($1, $2) RETURNING *;`

    await client.query(queryString, [userId, courseId])
}

export const deleteUserFromCourseService = async (userId: string, courseId: string): Promise<void> => {
    const queryString: string = `
    UPDATE "userCourses"
    SET "active" = false
    WHERE "courseId" = $1
    AND "userId" = $2;
`;

await client.query(queryString, [userId, courseId]);
}

