import { FunctionComponent, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDailyMeasurement } from "../../hooks/useDailyMeasurement";
import { getShortDate, getDirrentBetweenDays } from "../../utils/manageDate";
import AddWeight from "./AddWeight";
import { useAppSelector } from "../../hooks/useRedux";

interface StandardProps {
    setStep: (arg0: string) => void
}

const Standard: FunctionComponent<StandardProps> = ({ setStep }) => {
    const [daysToCoach, setDaysToCoach] = useState(7)
    const [{ data }] = useDailyMeasurement(getShortDate())
    const [isAddDialog, setIsAddDialog] = useState(false)
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => setDaysToCoach(getDirrentBetweenDays(token.coach || getShortDate(), getShortDate())), [token])

    return (
        <div className={styles.grid2Equal}>
            <div className={styles.AddWeightMain}>
                <div className={styles.AddWeightMainIconsSites}>
                    <div onClick={() => setStep('Welcome')}>
                        <IconButton aria-label="reset">
                            <RestartAltIcon />
                        </IconButton>
                        <div>New goal</div>
                    </div>
                    <div />
                    <div onClick={() => setIsAddDialog(true)}>
                        <IconButton aria-label="history">
                            <HistoryIcon />
                        </IconButton>
                        <div>History</div>
                    </div>
                </div>
                <div className={styles.AddWeightMainTitle}>
                    {
                        token.goal === 0
                            ?
                            (
                                <div>
                                    Recomposition
                                </div>
                            )
                            : token.goal > 0 ?
                                (
                                    <div>
                                        Building Muscles
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        Losing Weight
                                    </div>
                                )
                    }
                </div>
                <div>{token.goal / 4}kg / Week</div>
                <div>
                    Your goal is to
                    {
                        token.goal === 0
                            ?
                            " recomposition"
                            : token.goal > 0 ?
                                " building muscles"
                                :
                                " lose weight"
                    }
                    . Keep updating your weight everyday.
                    {
                        daysToCoach > 0 ?
                            ` In {daysToCoach} days we will `
                            :
                            ` It's time to `
                    }
                    check your progress and create new instruction.
                </div>
                <div>
                    {
                        data ?
                            (
                                data.weight > 0
                                    ?
                                    <Button variant="contained" onClick={() => setIsAddDialog(true)}>Change weight</Button>
                                    :
                                    <Button variant="contained" color="error" onClick={() => setIsAddDialog(true)}>Add weight</Button>
                            ) : (
                                <Button variant="contained" onClick={() => setIsAddDialog(true)}>Change weight</Button>
                            )
                    }
                </div>
            </div>
            <div className={styles.seperate} />
            <div className={styles.AddWeightSecond}>
                <div className={styles.AddWeightSecondInfo}>
                    <div>
                        <div>Last check</div>
                        <div className={styles.AddWeightSecondInfoBold}>20.06.2021</div>
                    </div>
                    <div />
                    <div>
                        <div>Next check</div>
                        <div className={styles.AddWeightSecondInfoBold}>20.06.2021</div>
                    </div>
                </div>
                {
                    daysToCoach > 0 ?
                        <>
                            <div>{daysToCoach} days until your next check in</div>
                            <div>
                                <Button disabled variant="contained">Check progress in {daysToCoach} days</Button>
                            </div>
                        </>
                        :
                        <>
                            <div>It's time to check your progress!</div>
                            <div>
                                <Button variant="contained" color="error">Check progress</Button>
                            </div>
                        </>
                }
            </div>
            <AddWeight isAddDialog={isAddDialog} closeDialog={() => setIsAddDialog(false)} />
        </div >
    )
}

export default Standard;