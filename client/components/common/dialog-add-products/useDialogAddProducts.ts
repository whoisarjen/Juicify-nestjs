import { useState, useEffect } from "react";
import { DialogAddProductsProps } from ".";
import useProducts from "../../../hooks/useProducts";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";
import { getAllIndexedDB } from "../../../utils/indexedDB.utils";
import useCommon from "../../../hooks/useCommon";
import useConsumed from "../../../hooks/useConsumed";

const useDialogAddProducts = ({ children, index, dailyMeasurement }: DialogAddProductsProps) => {
    const [isDialog, setIsDialog] = useState(false)
    const [loadedProduct, setLoadedProduct] = useState<any>(false)
    const { t, token, router } = useCommon()
    const [tab, setTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [meal, setMeal] = useState(index)
    const [checked, setChecked] = useState<PRODUCT_SCHEMA_PROPS[]>([])
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [find, setFind] = useState<any>(null)
    const { createConsumed } = useConsumed()

    const {
        products,
        fetching,
        findProducts,
    } = useProducts()

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
        console.log(checked)
        console.log('-----')

        await Promise.all(
            checked.map(product => createConsumed({
                meal,
                how_many: parseFloat(product.how_many as unknown as string),
                user: token.id,
                product: parseInt(product.id),
                date: router.query.date as string,
            }))
        )

        setChecked([])
        setIsDialog(false)
    }

    useEffect(() => setMeal(index), [index])
    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_product') || [])
        })()
    }, [refreshChecked])

    return {
        children,
        isDialog,
        setIsDialog,
        t,
        index,
        dailyMeasurement,
        meal,
        setMeal,
        open,
        setOpen,
        find,
        setFind,
        setTab,
        fetching,
        token,
        products,
        addProductsToDiary,
        setRefreshChecked,
        loadedProduct,
        setLoadedProduct,
        checked,
        created,
        refreshChecked,
    }
}

export type useDialogAddProductsProps = ReturnType<typeof useDialogAddProducts>

export default useDialogAddProducts;