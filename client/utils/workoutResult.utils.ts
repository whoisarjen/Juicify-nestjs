import { WorkoutResultSchemaProps } from "../schema/workoutResult.schema"

interface loadMissingDataForWorkoutResultProps {
    whenAdded: string
    workout_description?: string,
    object: WorkoutResultSchemaProps
}

export const loadMissingDataForWorkoutResult = ({ whenAdded, object, workout_description = '' }: loadMissingDataForWorkoutResultProps) => {
    return {
        ...(object?.id && ({ id: object.id } || { id: 'XD' + new Date().getTime() })),
        ...(object?.userid && ({ userid: object.userid } || { userid: '' })),
        ...(object?.workout_planid && ({ workout_planid: object.workout_planid } || { workout_planid: '' })),
        ...(object?.title && ({ title: object.title } || { title: '' })),
        // ...(object?.whenAdded && ({ whenAdded: object.whenAdded } || { whenAdded })),
        ...(object?.description && ({ description: object.description } || { description: '' })),
        ...(object?.burnt && ({ burnt: object.burnt } || { burnt: 0 })),
        ...(object?.workout_description && ({ workout_description: object.workout_description } || { workout_description })),
        ...(object?.results && ({ results: object.results } || { results: [] })),
    }
}

export const prepareWorkoutResultToSend = (object: WorkoutResultSchemaProps) => {
    return {
        ...(object?.id?.trim() && { id: object?.id?.trim() }),
        ...(object?.userid?.trim() && { userid: object?.userid?.trim() }),
        ...(object?.workout_planid?.trim() && { workout_planid: object?.workout_planid?.trim() }),
        ...(object?.title?.trim() && { title: object?.title?.trim() }),
        // // // ...(object?.whenAdded?.trim() && { whenAdded: object?.whenAdded?.trim() }),
        ...(object?.description?.trim() && { description: object?.description?.trim() }),
        ...(object?.results && { results: object?.results }),
    }
}

export const sortWorkoutResults = (a: any, b: any) => {
    if (a.notSaved && !b.notSaved) {
        return -1;
    }
    else if (!a.notSaved && b.notSaved) {
        return 1;
    }
    else if (b.whenAdded > a.whenAdded) {
        return 1;
    }
    else {
        return -1;
    }
}