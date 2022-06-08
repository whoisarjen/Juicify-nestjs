import { loadMissingDataForDailyMeasurement } from "../utils/dailyMeasurement.utils";
import { useQuery } from "urql";
import useCommon from "./useCommon";
import { useEffect, useMemo } from "react";
import useConsumed from "./useConsumed";

const DAILY_QUERY = `
    query daily ($findOneDailyInput: FindOneDailyInput!) {
        daily (findOneDailyInput: $findOneDailyInput) {
            id
            whenAdded
            user {
                id
                login
                numberOfMeals
                macronutrients {
                    proteins
                    carbs
                    fats
                }
            }
        }
    }
`

export const useDailyMeasurement = (when: string, login: string) => {
    const { router }: any = useCommon()
    const { data, fetching, error, findDay } = useConsumed()

    // const { data, user } = useMemo(() => ({
    //     user: response?.daily?.user,
    //     data: loadMissingDataForDailyMeasurement({
    //         whenAdded: when,
    //         userid: token.id,
    //         object: response?.daily,
    //     }),
    // }), [response?.daily, token.id, when])

    useEffect(() => {
        findDay({
            login: login || router.query.login,
            date: when || router.query.date,
        })
    }, [login, router.query.date, router.query.login, when])
console.log(data)
    return {
        data,
        // user,
        error,
        fetching,
    };
};
