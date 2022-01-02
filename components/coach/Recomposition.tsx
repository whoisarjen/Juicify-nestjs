import { FunctionComponent, useState } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';

interface RecompositionProps {
    prepareAnalize: (arg0: Object) => void
}

const Recomposition: FunctionComponent<RecompositionProps> = ({ prepareAnalize }) => {
    const [kindOfDiet, setKindOfDiet] = useState(0)
    const [levelOfActivity, setLevelOfActivity] = useState(1.2)

    const handleNextStep = () => {
        prepareAnalize({
            'tempo': 2,
            kindOfDiet,
            'doYouLift': true,
            levelOfActivity,
            coach_diet: 1,
            used_coach: true
        })
    }

    return (
        <div className={styles.recomposition}>
            <div className={styles.AddWeightMainTitle}><div>Recomposition</div></div>
            <div>Help me know bettrer your needs. Remember that faster results doesn't always mean better long term results. That's why even if we can get your goal faster, we put some limits on this.</div>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Level of activity</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={levelOfActivity}
                        label="Level of activity"
                        onChange={e => setLevelOfActivity(parseFloat(e.target.value.toString()))}
                    >
                        <MenuItem value={1.2}>No workouts, sedentary work, school</MenuItem>
                        <MenuItem value={1.375}>One workout per week, light work</MenuItem>
                        <MenuItem value={1.55}>2 workouts per week, work</MenuItem>
                        <MenuItem value={1.715}>3-4 workouts per week, heavy work</MenuItem>
                        <MenuItem value={1.9}>5+ workouts per week, physical work</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Kind of diet</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={kindOfDiet}
                        label="Kind of diet"
                        onChange={e => setKindOfDiet(parseInt(e.target.value.toString()))}
                    >
                        <MenuItem value={0}>Balanced diet (recommended)</MenuItem>
                        <MenuItem value={1}>Ketogenic diet</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button variant="contained" onClick={handleNextStep}>Count my diet</Button>
        </div>
    )
}

export default Recomposition;