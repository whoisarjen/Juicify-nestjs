import { FunctionComponent, useState } from "react";
import Standard from "../components/coach/Standard";
import Result from "../components/coach/Result";
import Welcome from "../components/coach/Welcome";
import { expectLoggedIN } from "../utils/checkAuth";
import MuscleBuilding from "../components/coach/MuscleBuilding";
import ChooseDiet from "../components/coach/ChooseDiet";
import CheckingTodayData from "../components/coach/CheckingTodayData";
import Recomposition from '../components/coach/Recomposition';
import LosingWeight from '../components/coach/LosingWeight';
import CheckingWeekData from '../components/coach/CheckingWeekData';
import ChooseCaloriesSource from '../components/coach/ChooseCaloriesSource';
import Loading from '../components/coach/Loading';
import { useAppSelector } from "../hooks/useRedux";
import useCoach from "../hooks/useCoach";
import { getAllIndexedDB, getIndexedDBbyID } from "../utils/indexedDB";
import { getAge, getDailyDate, getShortDate } from "../utils/manageDate";
import { loadMissingDays } from "../hooks/useDailyMeasurements";

const Coach: FunctionComponent = () => {
    expectLoggedIN()
    const [createDiet, analyzeDiet] = useCoach()
    const token: any = useAppSelector(state => state.token.value)
    const [step, setStep] = useState(token.coach_analyze ? 'Standard' : 'Welcome')

    const prepareCreate = async (object) => {
        setStep('Loading')
        const daily = await getIndexedDBbyID('daily_measurement', getDailyDate())
        await createDiet({
            ...object,
            ...{
                weight: daily.weight,
                age: getAge(token.birth),
                today: getShortDate()
            }
        })
            .then(() => setStep('Result'))
    }

    const prepareAnalize = async (isUseData) => {
        setStep('Loading')
        await analyzeDiet({
            isUseData,
            today: getShortDate(),
            age: getAge(token.birth),
            data: await loadMissingDays(await getAllIndexedDB('daily_measurement'), token._id, 15, getShortDate())
        })
            .then(() => setStep('Result'))
    }

    return (
        <div className="coach">
            {
                step === 'Welcome' ?
                    (
                        <>
                            <Welcome setStep={setStep} />
                        </>
                    ) : step === 'CheckingTodayData' ? (
                        <>
                            <CheckingTodayData setStep={setStep} />
                        </>
                    ) : step === 'ChooseDiet' ? (
                        <>
                            <ChooseDiet setStep={setStep} />
                        </>
                    ) : step === 'MuscleBuilding' ? (
                        <>
                            <MuscleBuilding prepareCreate={prepareCreate} />
                        </>
                    ) : step === 'Recomposition' ? (
                        <>
                            <Recomposition prepareCreate={prepareCreate} />
                        </>
                    ) : step === 'LosingWeight' ? (
                        <>
                            <LosingWeight prepareCreate={prepareCreate} />
                        </>
                    ) : step === 'Loading' ? (
                        <>
                            <Loading />
                        </>
                    ) : step === 'Standard' ? (
                        <>
                            <Standard setStep={setStep} />
                        </>
                    ) : step === 'CheckingWeekData' ? (
                        <>
                            <CheckingWeekData setStep={setStep} />
                        </>
                    ) : step === 'ChooseCaloriesSource' ? (
                        <>
                            <ChooseCaloriesSource prepareAnalize={prepareAnalize} />
                        </>
                    ) : step === 'Result' ? (
                        <>
                            <Result setStep={setStep} />
                        </>
                    ) : (
                        <>
                            {"We didn't code anything like that :("}
                            <button onClick={() => setStep('Welcome')}></button>
                        </>
                    )
            }
        </div>
    );
};

export default Coach;