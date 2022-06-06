import { number, object, string, TypeOf } from 'zod'

export const ExerciseSchema = object({
    id: string().optional(),
    userid: string().optional(),
    name: string().min(3),
    l: number().optional(),
})

export type ExerciseSchemaProps = TypeOf<typeof ExerciseSchema>