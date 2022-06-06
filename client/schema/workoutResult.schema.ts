import { array, boolean, number, object, preprocess, string, TypeOf } from 'zod'

export const ValueSchema = object({
    open: preprocess((val) => Boolean(val), boolean()).optional(),
    reps: preprocess((val) => Number(val), number()),
    weight: preprocess((val) => Number(val), number()),
})

export type ValueSchemaProps = TypeOf<typeof ValueSchema>

export const ResultSchema = object({
    id: string().optional(),
    name: string().optional(),
    values: array(ValueSchema),
})

export type ResultSchemaProps = TypeOf<typeof ResultSchema>

export const WorkoutResultSchema = object({
    id: string().optional(),
    userid: string().optional(),
    workout_planid: string().optional(),
    title: string().optional(),
    // whenAdded: string().optional(),
    description: string().optional(),
    burnt: preprocess((val) => Number(val), number()).optional(),
    workout_description: string().optional(),
    results: array(ResultSchema).optional(),
})

export type WorkoutResultSchemaProps = TypeOf<typeof WorkoutResultSchema>