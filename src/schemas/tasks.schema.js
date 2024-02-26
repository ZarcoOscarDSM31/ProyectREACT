import {z} from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'El titulo es obligatorio',
    }),
    description: z.string({
        required_error: 'La descripcion debe ser texto',
    }),
    date: z.string().datetime().optional(),
})