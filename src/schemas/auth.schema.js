import { z } from "zod";
export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es obligatorio',
    }),
    email: z.string({
        required_error: 'El correo es obligatorio',
    }).email({
        message: 'El correo es invalido',
    }),
    password: z.string({
        required_error: 'La contraseña es obligatoria',
    }).min(6, {
        message: 'La contraseña debe ser mayor o igual a 6 caracteres',
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El correo es requerido',
    }).email({
        message: 'Correo invalido',
    }),
    password: z.string({
        required_error: 'La contraseña es requerida',
    }).min(6, {
        message: 'La contraseña debe ser mayor o igual a 6 caracteres',
    })
});

//validaciones