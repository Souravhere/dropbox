import * as z from 'zod';

export const signUpSchema = z
    .object({     
        email: z
            .string()
            .min(1,{message:"Email is required"})
            .email({message:"Please Enter a vaild email"}),
        password: z
                .string()
                .min(1,{message:"Password is required"})
                .min(8,{message:"Password min lenght is 8 characters"}),
        passwordConformation: z
                .string()
                .min(1,{message:"Password is not matched"})
    })

.refine((data) => data.password === data.passwordConformation, {
    message:"Password is not match",
    path:["passwordConformation"],
});