import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import useOtherUser from "./useOtherUser"
import { useAppSelector } from "./useRedux"
import { WorkoutPlanSchemaProps } from "../schema/workoutPlan.schema"
import { isid } from "../utils/db.utils"
import { getIndexedDBbyID } from "../utils/indexedDB.utils"
import { loadMissingData } from "../utils/workoutPlan.utils"

const useGetWorkoutPlan = (id: string) => {
    const router: any = useRouter()
    const [user, setUser] = useState<any>({})
    const [reload, setReload] = useState(0)
    const [data, setData] = useState<WorkoutPlanSchemaProps>(loadMissingData({ id: 'XD' + new Date().getTime(), userid: '', object: {} }))
    const token: any = useAppSelector(state => state.token.value)
    const reloadKey = useAppSelector(state => state.key.workout_plan)
    const { loadValueByLogin } = useOtherUser()

    useEffect(() => {
        (async () => {
            if (id) {
                if (token.login == router.query.login) {
                    const workoutPlan: WorkoutPlanSchemaProps = await getIndexedDBbyID('workout_plan', id)

                    if (!workoutPlan) {
                        router.push(`/${router.query.login}/workout/plans`)
                    }

                    setUser(token)
                    setData(loadMissingData({ id: 'XD' + new Date().getTime(), userid: token.id, object: workoutPlan }))
                } else {
                    if (!await isid(router.query.id)) {
                        router.push(`/${router.query.login}/workout/plans`)
                    }

                    let res = await loadValueByLogin('workout_plan', id, router.query.login)

                    if (!res.data) {
                        router.push(`/${router.query.login}/workout/plans`)
                    }

                    setUser(res.user)
                    setData(loadMissingData({ id: 'XD' + new Date().getTime(), userid: res.user.id, object: res.data }))
                }
            }
        })()
    }, [id, reload, reloadKey])

    return { data, user, reload: () => setReload(reload + 1) }
}

export type useGetWorkoutPlanProps = ReturnType<typeof useGetWorkoutPlan>

export default useGetWorkoutPlan;