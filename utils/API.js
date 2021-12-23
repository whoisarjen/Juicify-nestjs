import { getIndexedDBbyID, addIndexedDB, deleteIndexedDB, putIndexedDB } from "./indexedDB"
import { store } from '../redux/store'
import { getCookie } from "./checkAuth"

const API = async (url, body) => {
    let response = {}
    let isSuccess = false
    console.log(url, body)
    const token = await getCookie('token')
    const refresh_token = await getCookie('refresh_token')
    const socket_ID = localStorage.getItem('socket_ID')
    await fetch(`http://localhost:4000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, token, refresh_token, socket_ID }),
    })
        .then((response) => response.json())
        .then((res) => {
            setLastUpdated()
            // Verify token diff here and mb refresh?
            // await gotNewToken(response.tokenGenerated, response.tokenRefreshGenerated)
            if (res.error) throw res
            response = res
            isSuccess = true
        })
        .catch((err) => console.log(err))
    return { response, isSuccess }
}

const loadValueByLogin = async (where, uniqueKey, login = uniqueKey) => {
    const { response, isSuccess } = await API(`/guest/${where}`, {
        uniqueKey,
        login
    })
    if (!response.data) response.data = {}
    if (isSuccess) {
        console.log(`loadOneValueByLogin: ${response}`)
        return response
    } else {
        console.log('loadOneValueByLogin: server error')
        return response
    }
}

const insertThoseIDStoDB = async (where, sentArray, whatToUpdate, value, whatToUpdate2, forceOffline = false) => {
    let array = JSON.parse(JSON.stringify(sentArray))
    const isOnline = store.getState().online.isOnline;
    console.log(`insertThoseIDStoDB is online: ${isOnline}`)
    let uniquePARAM = '_id'
    if (where == 'daily_measurement') uniquePARAM = "whenAdded"
    return new Promise(async resolve => {
        const copyArray = JSON.parse(JSON.stringify(array));
        const arrayIDSbeforeInsert = []
        console.log(copyArray)
        for (let i = 0; i < array.length; i++) {
            if (array[i]._id) {
                await deleteIndexedDB(where, array[i][uniquePARAM])
                arrayIDSbeforeInsert.push(array[i]._id)
                delete array[i]._id
            }
            if (where == 'daily_measurement' && isOnline) array[i] = await prepareDailyToSend(array[i], true)
        }
        console.log('after', array)
        if (isOnline && !forceOffline) {
            const { response, isSuccess } = await API(`/insert/${where}`, {
                array
            })
            if (isSuccess) {
                array = JSON.parse(JSON.stringify(response.data));
                if (where == 'daily_measurement') {
                    for (let i = 0; i < array.length; i++) {
                        if (await getIndexedDBbyID(where, array[i].whenAdded)) {
                            await deleteIndexedDB(where, array[i].whenAdded) // Server can return existing date
                        }
                    }
                }
                if (whatToUpdate && whatToUpdateARRAY.length > 0) {
                    for (let i = 0; i < array.length; i++) {
                        for (let a = 0; a < whatToUpdateARRAY.length; a++) {
                            let checker = 0
                            for (let b = 0; b < whatToUpdateARRAY[a][whatToUpdate].length; b++) {
                                if (whatToUpdateARRAY[a][whatToUpdate][b][value] == arrayIDSbeforeInsert[i]) {
                                    whatToUpdateARRAY[a][whatToUpdate][b][value] = array[i]._id
                                    checker++
                                }
                            }
                            if (checker > 0) {
                                await deleteIndexedDB('daily_measurement', new Date(whatToUpdateARRAY[a].whenAdded).toISOString())
                                await addIndexedDB('daily_measurement', [whatToUpdateARRAY[a]])
                            }
                        }
                    }
                }
                if (whatToUpdate2 && whatToUpdateARRAY2.length > 0) {
                    for (let i = 0; i < array.length; i++) {
                        for (let a = 0; a < whatToUpdateARRAY2.length; a++) {
                            if (whatToUpdateARRAY2[a][value] == arrayIDSbeforeInsert[i]) {
                                await putIndexedDB(whatToUpdate2, whatToUpdateARRAY2[a]._id, value, array[i]._id)
                            }
                        }
                    }
                }
            } else {
                return await insertThoseIDStoDB(where, copyArray, whatToUpdate, value, whatToUpdate2, true)
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                array[i]._id = "XD" + new Date().getTime() + i
            }
        }
        await addIndexedDB(where, array)
        return resolve(array)
    })
}

const overwriteThoseIDSinDB = async (where, sentArray, forceOffline = false) => {
    let array = JSON.parse(JSON.stringify(sentArray))
    const isOnline = store.getState().online.isOnline
    console.log(`overwriteThoseIDSinDB is online: ${isOnline}`)
    let uniquePARAM = '_id'
    if (where == 'daily_measurement') uniquePARAM = "whenAdded"
    return new Promise(resolve => {
        (async () => {
            let originalArray = JSON.parse(JSON.stringify(array.map((x) => {
                x.changed = true
                return x
            })));
            for (let i = 0; i < array.length; i++) {
                await deleteIndexedDB(where, array[i][uniquePARAM])
                if (where == 'daily_measurement' && isOnline) {
                    console.log('before prepare', sentArray[i])
                    array[i] = await prepareDailyToSend(array[i], true)
                    console.log('After prepare', array[i])
                }
            }
            if (isOnline && !forceOffline) {
                const { response, isSuccess } = await API(`/update/${where}`, {
                    array
                })
                if (isSuccess) {
                    let originalSentArray = JSON.parse(JSON.stringify(array));
                    array = JSON.parse(JSON.stringify(response.data));
                    console.log('overwriteThoseIDSinDB originalSentArray', originalSentArray)
                    console.log('overwriteThoseIDSinDB array', array)
                    if (where == 'daily_measurement') {
                        for (let i = 0; i < originalSentArray.length; i++) {
                            if (originalSentArray[i].nutrition_diary && originalSentArray[i].nutrition_diary.length > 0) {
                                for (let a = 0; a < originalSentArray[i].nutrition_diary.length; a++) {
                                    originalSentArray[i].nutrition_diary[a]._id = array[i].nutrition_diary[a]._id
                                    array[i].nutrition_diary[a] = originalSentArray[i].nutrition_diary[a]
                                }
                            }
                        }
                    }
                } else {
                    return await overwriteThoseIDSinDB(where, originalArray, true)
                }
            }
            await addIndexedDB(where, array)
            resolve(array);
        })();
    })
}

const deleteThoseIDSfromDB = async (where, array, isNewValueInDB, forceOffline = false) => {
    const isOnline = store.getState().online.isOnline
    if (isNewValueInDB) { // if there is new value in DB, check if still need to request delete
        for (let i = 0; i < array.length; i++) {
            if (!await getIndexedDBbyID(where, array[i]._id)) array.splice(i, 1)
        }
    }
    return new Promise(resolve => {
        (async () => {
            if (array.length > 0) {
                const originalArray = JSON.parse(JSON.stringify(array));
                for (let i = 0; i < array.length; i++) {
                    array[i].deleted = true
                    await deleteIndexedDB(where, array[i]._id)
                    if (where == 'daily_measurement' && isOnline) array[i] = await prepareDailyToSend(array[i], true)
                }
                if (isOnline && !forceOffline) {
                    if (await is_id(array[0]._id)) {
                        const { response, isSuccess } = await API(`/delete`, {
                            where,
                            array
                        })
                        if (!isSuccess) {
                            return await deleteThoseIDSfromDB(where, originalArray, isNewValueInDB, true)
                        }
                    }
                } else {
                    for (let i = array.length - 1; i >= 0; i--) {
                        if (!await is_id(array[i]._id)) {
                            await deleteIndexedDB(where, array[i]._id)
                            array.splice(i, 1)
                        }
                    }
                    if (array.length > 0) await addIndexedDB(where, array)
                }
            }
            resolve();
        })();
    })
}

const prepareDailyToSend = async (daily_measurement, removeDeleted) => {
    const object = JSON.parse(JSON.stringify(daily_measurement))
    return new Promise(resolve => {
        (async () => {
            if (object._id && !await is_id(object._id)) {
                delete object._id
            }
            if (object.nutrition_diary && object.nutrition_diary.length > 0) {
                for (let i = object.nutrition_diary.length - 1; i >= 0; i--) {
                    if (removeDeleted && object.nutrition_diary[i].deleted) {
                        object.nutrition_diary.splice(i, 1)
                    } else if (object.nutrition_diary[i]._id && !await is_id(object.nutrition_diary[i]._id)) {
                        delete object.nutrition_diary[i]._id
                    }
                }
            }
            if (object.workout_result && object.workout_result.length > 0) {
                for (let i = object.workout_result.length - 1; i >= 0; i--) {
                    if (removeDeleted && object.workout_result[i].deleted) {
                        object.workout_result.splice(i, 1)
                    } else if (object.workout_result[i]._id && !await is_id(object.workout_result[i]._id)) {
                        delete object.workout_result[i]._id
                    }
                }
            }
            if (object.nutrition_diary && object.nutrition_diary.length == 0) {
                delete object.nutrition_diary
            }
            if (object.workout_result && object.workout_result.length == 0) {
                delete object.workout_result
            }
            resolve(object);
        })();
    });
}

const is_id = async (_id) => {
    return new Promise(resolve => {
        (_id).substring(0, 2) != "XD" ? resolve(true) : resolve(false)
    })
}

const setLastUpdated = () => {
    localStorage.setItem('lastUpdated', new Date().getTime())
}

export {
    API,
    insertThoseIDStoDB,
    is_id,
    overwriteThoseIDSinDB,
    loadValueByLogin,
    setLastUpdated,
    deleteThoseIDSfromDB
}