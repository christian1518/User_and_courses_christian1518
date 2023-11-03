import { hash } from "bcryptjs";
import { UserCreate, UserRead, UserResult, UserReturn } from "../interfaces/user.interface";
import format from "pg-format";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";
import AppError from "../errors/AppError.errors";

export const createUserService = async (data: UserCreate): Promise<UserReturn> => {
    data.password = await hash(data.password, 10)

    const queryFormat: string = format(`
    INSERT INTO "users" (%I) VALUES (%L) RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
    )

    const queryResult: UserResult = await client.query(queryFormat)

    return userReturnSchema.parse(queryResult.rows[0])
}

export const readUserService = async (): Promise<UserRead> => {
    const queryString: string = 'SELECT * FROM "users";'
    const queryResult: UserResult = await client.query(queryString)

    return userReadSchema.parse(queryResult.rows)
}

export const readCourseUserService = async (userId: string) => {
    const queryString: string = `
    SELECT
        "c"."id" "courseId",
        "c"."name" "courseName",
        "c"."description" "courseDescription",
        "uc"."active" "userActiveInCourse",
        "u"."id" "userId",
        "u"."name" "userName"
    FROM "users" "u"
    JOIN "userCourses" "uc"
        ON "u"."id" = "uc"."userId"
    JOIN "courses" "c"
        ON "c"."id" = "uc"."courseId"
    WHERE "u"."id" = $1;
    `

    const queryResult: UserResult = await client.query(queryString, [userId])

    if(!queryResult.rowCount) {
        throw new AppError('No course found', 404)
    }

    return queryResult.rows
}

