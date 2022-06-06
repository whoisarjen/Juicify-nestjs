import { boolean, number, object, preprocess, string, TypeOf } from 'zod'

export const ProductSchema = object({
    id: string(),
    name: string().min(3),
    productid: string().optional(),
    meal: preprocess((val) => Number(val), number()).optional(),
    proteins: preprocess((val) => Number(val), number()).optional(),
    carbs: preprocess((val) => Number(val), number()).optional(),
    sugar: preprocess((val) => Number(val), number()).optional(),
    fats: preprocess((val) => Number(val), number()).optional(),
    fiber: preprocess((val) => Number(val), number()).optional(),
    salt: preprocess((val) => Number(val), number()).optional(),
    ethanol: preprocess((val) => Number(val), number()).optional(),
    barcode: preprocess((val) => Number(val), number()).optional(),
    is_expecting_check: boolean().optional(),
    is_verified: boolean().optional(),
    how_many: preprocess((val) => Number(val), number()).optional(),
})

export type PRODUCT_SCHEMA_PROPS = TypeOf<typeof ProductSchema>