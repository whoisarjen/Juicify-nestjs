import { useState, useEffect } from "react";
import { DialogAddExerciseProps } from ".";
import useFind from "../../../hooks/useFind";
import { ExerciseSchemaProps } from "../../../schema/exercise.schema";
import { deleteIndexedDB, getAllIndexedDB } from "../../../utils/indexedDB.utils";

const useDialogAddExercise = ({ children, skipThoseIDS, addThoseExercises }: DialogAddExerciseProps) => {
    const [tab, setTab] = useState(0)
    const [checked, setChecked] = useState([])
    const [isDialog, setIsDialog] = useState(false)
    const [find, setFind] = useState<string | null>(null)
    const [refreshChecked, setRefreshChecked] = useState(0)
    const { items, loading, searchCache } = useFind(find, 'exercise', tab, skipThoseIDS)

    const addExercisesToWorkoutPlan = async () => {
        checked.forEach(async (x: ExerciseSchemaProps) => {
            if (x.id) await deleteIndexedDB('checked_exercise', x.id)
        })
        addThoseExercises(checked)
        setIsDialog(false)
        setFind(null)
        setChecked([])
    }

    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_exercise') || [])
        })()
    }, [refreshChecked])

    return { children, isDialog, setIsDialog, find, setFind, loading, searchCache, items, checked, setTab, setRefreshChecked, refreshChecked, addExercisesToWorkoutPlan }
}

export type useDialogAddExerciseProps = ReturnType<typeof useDialogAddExercise>

export default useDialogAddExercise;