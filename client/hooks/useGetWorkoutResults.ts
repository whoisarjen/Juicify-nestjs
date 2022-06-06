import { useRouter } from "next/router";
import { useAppSelector } from "./useRedux";
import { useState, useEffect } from "react";
import { getAllIndexedDB } from "../utils/indexedDB.utils";
import useOtherUser from "./useOtherUser";
import { WorkoutPlanSchemaProps } from "../schema/workoutPlan.schema";
import { sortWorkoutResults } from "../utils/workoutResult.utils";

interface useGetWorkoutResultsResponseProps {
    data: WorkoutPlanSchemaProps[]
    user: any
}

const useGetWorkoutResults = (): useGetWorkoutResultsResponseProps => {
    const router: any = useRouter()
    const [data, setData] = useState<WorkoutPlanSchemaProps[]>([])
    const [user, setUser] = useState({})
    const theOldestSupportedDate = useAppSelector(state => state.config.theOldestSupportedDate)
    const token: any = useAppSelector(state => state.token.value)
    const { loadValueByLogin } = useOtherUser()

    useEffect(() => {
        (async () => {
            let results = []
            if (token?.login == router?.query.login) {
                let cache = await getAllIndexedDB('workout_result')
                let daily_measurements = await getAllIndexedDB('daily_measurement')
                if (daily_measurements.length) {
                    for (let i = 0; i < daily_measurements.length; i++) {
                        if (daily_measurements[i].workout_result && daily_measurements[i].workout_result.length) {
                            for (let a = 0; a < daily_measurements[i].workout_result.length; a++) {
                                results.push({ ...daily_measurements[i].workout_result[a], whenAdded: daily_measurements[i].whenAdded.slice(0, 10) })
                            }
                        }
                    }
                }
                if (results.length) {
                    if (cache.length) {
                        for (let a = 0; a < cache.length; a++) {
                            let checker = false;
                            for (let i = 0; i < results.length; i++) {
                                if (cache[a].id == results[i].id) {
                                    results[i] = { ...cache[a], notSaved: new Date().getTime() }
                                    checker = true;
                                    break;
                                }
                            }
                            if (!checker) {
                                results.push({ ...cache[a], notSaved: new Date().getTime() })
                            }
                        }
                    }
                } else {
                    results = cache.map((x: any) => {
                        x.notSaved = new Date().getTime()
                        return x
                    })
                }
                setUser(token)
                setData(results.sort(sortWorkoutResults) || [])
            } else {
                let response = await loadValueByLogin('daily_measurements', theOldestSupportedDate(), router.query.login)
                let results: any = []
                if (response?.data?.length) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].workout_result && response.data[i].workout_result.length) {
                            for (let a = response.data[i].workout_result.length - 1; a >= 0; a--) {
                                results.push({ ...response.data[i].workout_result[a], whenAdded: response.data[i].whenAdded.slice(0, 10) })
                            }
                        }
                    }
                }
                setData(results.sort(sortWorkoutResults) || [])
                setUser(response.user || [])
            }
        })()
    }, [router.query])

    return { data, user };
}

export default useGetWorkoutResults;