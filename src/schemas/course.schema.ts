import { z } from "zod";

export const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15).min(3),
    description: z.string()
})

export const courseCreateSchema = courseSchema.omit({id:true})
export const courseReadSchema = courseSchema.array()
//obs: adicionei o .array().min(1)