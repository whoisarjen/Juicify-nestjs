import { store } from "../redux/store";
import { DailyMeasurementSchemaProps } from "../schema/dailyMeasurement.schema";
import { addDaysToDate } from "./date.utils";
import { isid } from "./db.utils";
import { deleteIndexedDB } from "./indexedDB.utils";
import { v4 } from "uuid";

interface loadMissingDataForDailyMeasurementProps {
    userid: string,
    whenAdded: string,
    object?: any
}

export const loadMissingDataForDailyMeasurement = ({ userid, whenAdded, object = {} }: loadMissingDataForDailyMeasurementProps) => {
    return {
        ...(object?.id ? { id: object.id } : { id: 'XD' + v4() }),
        ...(object?.weight ? { weight: object.weight } : { weight: 0 }),
        ...(object?.user?.id ? { userid: object.user.id } : { userid }),
        ...(object?.whenAdded ? { whenAdded: object.whenAdded } : { whenAdded }),
        ...(object?.nutrition_diary ? { nutrition_diary: object.nutrition_diary } : { nutrition_diary: [] }),
        ...(object?.workout_result ? { workout_result: object.workout_result } : { workout_result: [] }),
    }
}

export const loadMissingDays = async (oryginalArray: Array<DailyMeasurementSchemaProps> = [], userid: string, howManyDays: number, today: Date | string) => {
    let newArray = []
    let checkingDate = JSON.parse(JSON.stringify(new Date(today)))
    let array = JSON.parse(JSON.stringify(oryginalArray))
    if (array.length) {
        array = array.sort((a: DailyMeasurementSchemaProps, b: DailyMeasurementSchemaProps) => {
            if (a.whenAdded < b.whenAdded) {
                return 1
            } else {
                -1
            }
        })
    }
    let object: any = {}
    for (let i = 0; i < array.length; i++) {
        if (array[i].whenAdded > store.getState().config.theOldestSupportedDate()) {
            object[array[i].whenAdded as keyof object] = array[i]
        } else {
            await deleteIndexedDB('daily_measurement', array[i].whenAdded) // Kick from cache
        }
    }
    for (let i = 0; i < howManyDays; i++) {
        newArray.push(
            loadMissingDataForDailyMeasurement({
                ...{ id: "XD" + new Date().getTime() + i, userid, whenAdded: checkingDate },
                object: object[checkingDate]
            })
        );
        checkingDate = new Date(addDaysToDate(checkingDate, -1)).toJSON()
    }
    return newArray
}

export const prepareToSend = async (daily_measurement: any, removeDeleted: boolean = false) => {
    const object = JSON.parse(JSON.stringify(daily_measurement))
    if (object.id && !await isid(object.id)) {
        delete object.id
    }
    if (object.nutrition_diary && object.nutrition_diary.length > 0) {
        for (let i = object.nutrition_diary.length - 1; i >= 0; i--) {
            if (removeDeleted && object.nutrition_diary[i].deleted) {
                object.nutrition_diary.splice(i, 1)
            } else if (object.nutrition_diary[i].id && !await isid(object.nutrition_diary[i].id)) {
                delete object.nutrition_diary[i].id
            }
        }
    }
    if (object.workout_result && object.workout_result.length > 0) {
        for (let i = object.workout_result.length - 1; i >= 0; i--) {
            if (removeDeleted && object.workout_result[i].deleted) {
                object.workout_result.splice(i, 1)
            } else if (object.workout_result[i].id && !await isid(object.workout_result[i].id)) {
                delete object.workout_result[i].id
            }
        }
    }
    if (object.nutrition_diary && object.nutrition_diary.length == 0) {
        delete object.nutrition_diary
    }
    if (object.workout_result && object.workout_result.length == 0) {
        delete object.workout_result
    }

    // DB think no value = 0, so we don't need values == 0 (can be string too!)
    const keys = Object.keys(object)
    keys.forEach(x => {
        if (object[x] == 0) {
            delete object[x]
        }
    })
    return object;
}

export const createOneFromTwo = async (callbackObject: any, secondObject: any) => {
    let changed = JSON.parse(JSON.stringify(callbackObject))
    let isDataAlreadyInIndexedDB = JSON.parse(JSON.stringify(secondObject))
    if (!changed.id && isDataAlreadyInIndexedDB.id) changed.id = isDataAlreadyInIndexedDB.id
    if (isDataAlreadyInIndexedDB.weight && !changed.weight) changed.weight = isDataAlreadyInIndexedDB.weight
    if (isDataAlreadyInIndexedDB.weight_description && !changed.weight_description) changed.weight_description = isDataAlreadyInIndexedDB.weight_description
    if (isDataAlreadyInIndexedDB.neck && !changed.neck) changed.neck = isDataAlreadyInIndexedDB.neck
    if (isDataAlreadyInIndexedDB.shoulders && !changed.shoulders) changed.shoulders = isDataAlreadyInIndexedDB.shoulders
    if (isDataAlreadyInIndexedDB.chest && !changed.chest) changed.chest = isDataAlreadyInIndexedDB.chest
    if (isDataAlreadyInIndexedDB.biceps && !changed.biceps) changed.biceps = isDataAlreadyInIndexedDB.biceps
    if (isDataAlreadyInIndexedDB.waist && !changed.waist) changed.waist = isDataAlreadyInIndexedDB.waist
    if (isDataAlreadyInIndexedDB.hips && !changed.hips) changed.hips = isDataAlreadyInIndexedDB.hips
    if (isDataAlreadyInIndexedDB.thigh && !changed.thigh) changed.thigh = isDataAlreadyInIndexedDB.thigh
    if (isDataAlreadyInIndexedDB.calf && !changed.calf) changed.calf = isDataAlreadyInIndexedDB.calf
    if (isDataAlreadyInIndexedDB.water && !changed.water) changed.water = isDataAlreadyInIndexedDB.water

    if (isDataAlreadyInIndexedDB.nutrition_diary && !changed.nutrition_diary) {
        changed.nutrition_diary = isDataAlreadyInIndexedDB.nutrition_diary
    } else if (isDataAlreadyInIndexedDB.nutrition_diary && changed.nutrition_diary) {
        if (changed.nutrition_diary.length) {
            for (let a = 0; a < changed.nutrition_diary.length; a++) {
                if (changed.nutrition_diary[a].deleted) {
                    isDataAlreadyInIndexedDB.nutrition_diary = isDataAlreadyInIndexedDB.nutrition_diary.filter((x: any) => x.id != changed.nutrition_diary[a].id)
                } else if (!await isid(changed.nutrition_diary[a].id)) {
                    isDataAlreadyInIndexedDB.nutrition_diary.push(changed.nutrition_diary[a])
                } else if (changed.nutrition_diary[a].changed) {
                    const indexNumber = isDataAlreadyInIndexedDB.nutrition_diary.findIndex((x: any) => x.id == changed.nutrition_diary[a].id)
                    if (parseInt(indexNumber) >= 0) {
                        isDataAlreadyInIndexedDB.nutrition_diary[indexNumber] = changed.nutrition_diary[a]
                    }
                }
            }
        }
        changed.nutrition_diary = isDataAlreadyInIndexedDB.nutrition_diary
    }

    if (isDataAlreadyInIndexedDB.workout_result && !changed.workout_result) {
        changed.workout_result = isDataAlreadyInIndexedDB.workout_result
    } else if (isDataAlreadyInIndexedDB.workout_result && changed.workout_result) {
        if (changed.workout_result.length.length) {
            for (let a = 0; a < changed.workout_result.length; a++) {
                if (changed.workout_result[a].deleted) {
                    isDataAlreadyInIndexedDB.workout_result = isDataAlreadyInIndexedDB.workout_result.filter((x: any) => x.id != changed.workout_result[a].id)
                } else if (!await isid(changed.workout_result[a].id)) {
                    isDataAlreadyInIndexedDB.workout_result.push(changed.workout_result[a])
                } else if (changed.workout_result[a].changed) {
                    const indexNumber = isDataAlreadyInIndexedDB.workout_result.findIndex((x: any) => x.id == changed.workout_result[a].id)
                    if (parseInt(indexNumber) >= 0) {
                        isDataAlreadyInIndexedDB.workout_result[indexNumber] = changed.workout_result[a]
                    }
                }
            }
        }
        changed.workout_result = isDataAlreadyInIndexedDB.workout_result
    }
    return changed;
}