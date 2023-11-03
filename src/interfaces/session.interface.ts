import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";
import { QueryResult } from "pg";

export type SessionRequest = z.infer<typeof sessionSchema>
export type SessionResult = QueryResult<SessionRequest>
export type SessionReturn = { token: string }