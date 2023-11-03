import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).min(3),
    email: z.string().max(50).email(),
    password: z.string().max(255),
    admin: z.boolean().default(false)
})

export const userCreateSchema = userSchema.omit({id:true})
export const userUpdateSchema = userCreateSchema.partial()
export const userReturnSchema = userSchema.omit({password:true})
export const userReadSchema = userReturnSchema.array()