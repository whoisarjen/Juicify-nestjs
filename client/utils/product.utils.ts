import { ActivitySchemaProps } from "../schema/activity.schema"
import { PRODUCT_SCHEMA_PROPS } from "../schema/product.schema"

const getProductInformationsObject: any = {
    'proteins': 'Proteins',
    'carbs': 'Carbs',
    'sugar': 'Sugar',
    'fats': 'Fats',
    'fiber': 'Fiber',
    'salt': 'Salt',
    'ethanol': 'Ethanol',
    'calories': 'Calories',
    'is_verified': 'Verified'
}

export const getProductInformations = (object: PRODUCT_SCHEMA_PROPS & ActivitySchemaProps) => {
    let newObject: any = {}
    Object.keys(getProductInformationsObject).forEach(x => {
        if (x != 'v') {
            if (object[x as keyof PRODUCT_SCHEMA_PROPS]) {
                newObject[getProductInformationsObject[x]] = object[x as keyof PRODUCT_SCHEMA_PROPS] + 'g'
            } else {
                newObject[getProductInformationsObject[x]] = '0g'
            }
        }
    })
    return {
        Name: object.name,
        ...(object.barcode && { barcode: object.barcode }),
        ...newObject,
        Calories: Math.round((object.proteins || 0) * 4 + (object.carbs || 0) * 4 + (object.fats || 0) * 9) + 'kcal'
    }
}

interface getCaloriesProps {
    proteins?: number,
    carbs?: number,
    fats?: number,
    ethanol?: number,
    calories?: number,
    how_many?: number,
}

export const getCalories = (object: getCaloriesProps) => {
    if (!object) {
        return 0
    }
    if (object.calories) {
        return parseInt((object.calories).toString())
    } else {
        return parseInt(((object.proteins || 0) * (object.how_many || 1) * 4 + (object.carbs || 0) * (object.how_many || 1) * 4 + (object.fats || 0) * (object.how_many || 1) * 9 + (object.ethanol || 0) * (object.how_many || 1) * 7).toString())
    }
}

export const getMacronutrient = (object: getCaloriesProps, macronutrient: string) => {
    if (macronutrient == 'p') {
        return (object.proteins || 0) * (object.how_many || 1)
    }
    if (macronutrient == 'c') {
        return (object.carbs || 0) * (object.how_many || 1)
    }
    if (macronutrient == 'f') {
        return (object.fats || 0) * (object.how_many || 1)
    }

    return 0;
}