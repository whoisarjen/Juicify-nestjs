import { useState, useEffect } from "react";
import { DialogAddProductsProps } from ".";
import useProducts from "../../../hooks/useProducts";
import { useAppDispatch } from "../../../hooks/useRedux";
import { refreshKey } from "../../../redux/features/key.slice";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";
import { insertThoseIDStoDBController } from "../../../utils/db.utils";
import { deleteIndexedDB, getAllIndexedDB } from "../../../utils/indexedDB.utils";
import useCommon from "../../../hooks/useCommon";

const useDialogAddProducts = ({ children, index, dailyMeasurement }: DialogAddProductsProps) => {
    const [isDialog, setIsDialog] = useState(false)
    const [loadedProduct, setLoadedProduct] = useState<any>(false)
    const { t, token} = useCommon()
    const [tab, setTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [meal, setMeal] = useState(index)
    const [checked, setChecked] = useState([])
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [find, setFind] = useState<any>(null)

    const {
        products,
        fetching,
        findProducts,
    } = useProducts()
    const dispatch = useAppDispatch()

    useEffect(() => {
        findProducts(find)
    }, [find, findProducts])

    const created = async (productName: string) => {
        if (productName == find) {
            setFind(null)
        } else {
            setFind(productName)
        }
    }

    const addProductsToDiary = async () => {
        const array: Array<PRODUCT_SCHEMA_PROPS> = JSON.parse(JSON.stringify(checked))
        const time = new Date().getTime()
        array.map(async (x: PRODUCT_SCHEMA_PROPS, i: number) => {
            x.meal = meal
            x.product_ID = x._id
            x._id = 'XD' + time + i
            await deleteIndexedDB('checked_product', x.product_ID)
            return x
        })
        setChecked([])
        if (!dailyMeasurement.nutrition_diary) dailyMeasurement.nutrition_diary = []
        dailyMeasurement.nutrition_diary = dailyMeasurement.nutrition_diary.concat(array)
        await insertThoseIDStoDBController('daily_measurement', [dailyMeasurement])
        dispatch(refreshKey('daily_measurement'))
        setIsDialog(false)
    }

    useEffect(() => setMeal(index), [index])
    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_product') || [])
        })()
    }, [refreshChecked])

    return { children, isDialog, setIsDialog, t, index, dailyMeasurement, meal, setMeal, open, setOpen, find, setFind, setTab, fetching, token, products, addProductsToDiary, setRefreshChecked, loadedProduct, setLoadedProduct, checked, created, refreshChecked }
}

export type useDialogAddProductsProps = ReturnType<typeof useDialogAddProducts>

export default useDialogAddProducts;