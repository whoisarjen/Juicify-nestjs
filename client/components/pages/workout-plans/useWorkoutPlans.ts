import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";
import { useAppSelector } from '../../../hooks/useRedux';
import useGetWorkoutPlans from '../../../hooks/useGetWorkoutPlans';
import { addIndexedDB } from '../../../utils/indexedDB.utils';

const useWorkoutPlans = () => {
    const router = useRouter()
    const { data, user } = useGetWorkoutPlans()
    const { t } = useTranslation('workout');
    const token: any = useAppSelector(state => state.token.value)

    const createWorkoutPlan = async () => {
        const newWorkoutPlan = { id: 'XD' + new Date().getTime(), userid: token.id }
        await addIndexedDB('workout_plan', [newWorkoutPlan])
        router.push(`/${router.query.login}/workout/plans/${newWorkoutPlan.id}`)
    }

    return { data, router, token, createWorkoutPlan, user, t }
}

export type useWorkoutPlansProps = ReturnType<typeof useWorkoutPlans>

export default useWorkoutPlans;