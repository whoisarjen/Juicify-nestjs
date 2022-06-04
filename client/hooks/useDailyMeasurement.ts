import { loadMissingDataForDailyMeasurement } from "../utils/dailyMeasurement.utils";
import { useQuery } from "urql";
import useCommon from "./useCommon";
import { useEffect, useMemo } from "react";

const DAILY = `
    query daily ($findOneDailyInput: FindOneDailyInput!) {
        daily (findOneDailyInput: $findOneDailyInput) {
            _id
            whenAdded
            user {
                _id
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
    const { token, router } = useCommon()

    const [{ data: response, fetching, error }, reexecuteQuery] = useQuery({
        query: DAILY,
        variables: {
            findOneDailyInput: {
                login: login || router.query.login,
                whenAdded: when || router.query.date,
            }
        }
    })

    const { data, user } = useMemo(() => {
        return {
            user: response?.daily?.user,
            data: loadMissingDataForDailyMeasurement({
                whenAdded: when,
                user_ID: token._id,
                object: response?.daily,
            }),
        }
    }, [response?.daily, token._id, when])

    useEffect(() => {
        reexecuteQuery()
    }, [reexecuteQuery, router.query.login, router.query.whenAdded])

    return {
        data,
        user,
        error,
        fetching,
    };
};
