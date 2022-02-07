import { boolean, number, object, preprocess, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createUserSchema = object({
    body: object({
        login: string({
            required_error: errorBook['LOGIN IS REQUIRED']['VALUE']
        }).min(3),
        password: string({
            required_error: errorBook['PASSWORD IS REQUIRED']['VALUE']
        }).min(8),
        passwordConfirmation: string({
            required_error: errorBook['PASSWORD CONFIRMATION IS REQUIRED']['VALUE']
        }).min(8),
        email: string({
            required_error: errorBook['EMAIL IS REQUIRED']['VALUE']
        })
            .email(errorBook['EMAIL IS NOT VALID']['VALUE']),
        height: preprocess((val) => Number(val), number({
            required_error: errorBook['HEIGHT IS REQUIRED']['VALUE']
        })),
        birth: string({
            required_error: errorBook['BIRTHDAY IS REQUIRED']['VALUE']
        }),
        sex: preprocess((val) => Boolean(val), boolean({
            required_error: errorBook['SEX IS REQUIRED']['VALUE']
        }))
    })
}).refine((data: any) => data.password === data.passwordConfirmation, {
    message: errorBook['PASSWORDS DO NOT MATCH']['VALUE'],
    path: ['passwordConfirmation']
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">

export const confirmEmailSchema = object({
    body: object({
        email_confirmation_hash: string().min(3)
    })
})

export type confirmEmailInput = Omit<TypeOf<typeof confirmEmailSchema>, "body.passwordConfirmation">