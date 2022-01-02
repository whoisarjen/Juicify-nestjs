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
import Loading from '../components/coach/Loading';
import { useAppSelector } from "../hooks/useRedux";

const Coach: FunctionComponent = () => {
    expectLoggedIN()
    const token: any = useAppSelector(state => state.token.value)
    const [step, setStep] = useState(token.used_coach ? 'Standard' : 'Welcome')

    const prepareAnalize = (object) => {
        setStep('Loading')
        console.log('prepareAnalize', object)
        setTimeout(() => {
            setStep('Result')
        }, 2500)
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
                            <MuscleBuilding prepareAnalize={prepareAnalize} />
                        </>
                    ) : step === 'Recomposition' ? (
                        <>
                            <Recomposition prepareAnalize={prepareAnalize} />
                        </>
                    ) : step === 'LosingWeight' ? (
                        <>
                            <LosingWeight prepareAnalize={prepareAnalize} />
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