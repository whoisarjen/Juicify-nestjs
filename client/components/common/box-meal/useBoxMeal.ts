import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BoxMealProps } from ".";
import { useAppSelector } from "../../../hooks/useRedux";
import { getMacronutrient } from '../../../utils/product.utils'

const useBoxMeal = ({ children, index, products, data }: BoxMealProps) => {
    const { t } = useTranslation('nutrition-diary');
    const router: any = useRouter();
    const token: any = useAppSelector((state) => state.token.value);
    const [macro, setMacro] = useState({ proteins: 0, carbs: 0, fats: 0 })

    useEffect(() => {
        let countmacro = { proteins: 0, carbs: 0, fats: 0 }
        products.forEach(product => {
            countmacro = {
                proteins: (countmacro.proteins + getMacronutrient(product, 'proteins')),
                carbs: (countmacro.carbs + getMacronutrient(product, 'carbs')),
                fats: (countmacro.fats + getMacronutrient(product, 'fats'))
            }
        })
        setMacro(countmacro)
    }, [products, index, router.query.date])

    return { children, t, index, data, token, router, macro }
}

export type useBoxMealProps = ReturnType<typeof useBoxMeal>

export default useBoxMeal;