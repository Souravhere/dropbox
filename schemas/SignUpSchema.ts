import * as z from 'zod';

export const signUpSchema = z
    .object({
        email: z
            .string()
            .min(1,{message:"Email is required"})
            .email({message:"Please Enter a vaild email"})
    })