import {z} from "zod";

export const registerSchema = z
    .object({
        email: z.string(),
        password: z.string().min(6, 'Password is too short'),
        confirmPassword: z.string(),
    })
    .refine((data)=>data.password===data.confirmPassword, {
        message: "Passwords do not match, please try again",
        path: ['confirmPassword'],
    })

export type RegisterFormValues = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(1, 'Please enter your password'),
})

export type LoginFormValues = z.infer<typeof loginSchema>