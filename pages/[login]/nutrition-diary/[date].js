import Link from "next/link"
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { addDaysToDate } from '../../../utils/manageDate'
import { useDailyMeasurement } from '../../../hooks/useDaily'
import MealBox from "../../../components/nutrition-diary/MealBox"
import AddProducts from '../../../components/nutrition-diary/AddProducts'
import { overwriteThoseIDSinDB } from "../../../utils/API"

const NutritionDiary = () => {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const token = useSelector(state => state.token.value)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [nutrition_diary, setNutrition_diary] = useState([])
    const [dailyMeasurement, reloadDailyMeasurement] = useDailyMeasurement(router.query.date)
    const isOnline = useSelector(state => state.online.isOnline)

    const deleteProduct = async (product) => {
        let copyDailyMeasurement = JSON.parse(JSON.strinigify(dailyMeasurement))
        copyDailyMeasurement.nutrition_diary = copyDailyMeasurement.map(obj =>
            obj._id == product._id ? { ...obj, deleted: true } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copyDailyMeasurement], isOnline)
        reloadDailyMeasurement()
    }

    useEffect(() => {
        if (dailyMeasurement && dailyMeasurement.nutrition_diary) {
            const arr = []
            for (let i = 0; i < token.meal_number; i++) {
                arr.push([])
            }
            const length = arr.length
            dailyMeasurement.nutrition_diary.forEach(meal => {
                if (meal.meal + 1 > length) {
                    for (let i = 0; i < meal.meal + 1 - length; i++) {
                        arr.push([])
                    }
                }
                arr[meal.meal].push(meal)
            })
            setNutrition_diary(arr)
        }
    }, [dailyMeasurement])

    return (
        <div className="NutritionDiary">
            <Link passHref href={`/${router.query.login}/nutrition-diary/${addDaysToDate(router.query.date, 1)}`}><a>Next</a></Link>
            {
                nutrition_diary && nutrition_diary.map((x, i) => (
                    <MealBox
                        key={i}
                        index={i}
                        products={x}
                        openDialog={() => {
                            setIndex(i)
                            setIsDialogOpen(true)
                        }}
                        deleteProduct={deleteProduct}
                    />
                ))
            }
            {
                token.login == router.query.login &&
                <AddProducts
                    index={index}
                    isDialogOpen={isDialogOpen}
                    dailyMeasurement={dailyMeasurement}
                    closeDialog={() => setIsDialogOpen(false)}
                    reloadDailyMeasurement={reloadDailyMeasurement}
                />
            }
        </div>
    );
};

export default NutritionDiary;
