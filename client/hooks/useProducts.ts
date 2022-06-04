import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { PRODUCT_SCHEMA_PROPS } from '../schema/product.schema';

const PRODUCT = `
    _id
    name
    p
    c
    f
    updatedAt
    user {
        _id
        login
    }
`

const PRODUCTS_QUERY = `
    query products ($findProductsInput: FindProductsInput!) {
        products (findProductsInput:$findProductsInput) {
            ${PRODUCT}
        }
    }
`;

const CREATE_PRODUCT = `
    mutation createProduct($createProductInput: CreateProductInput!){
        createProduct(createProductInput: $createProductInput){
            ${PRODUCT}
        }
    }
`;

const REMOVE_PRODUCT = `
    mutation removeProduct($_id: String!){
        removeProduct(_id: $_id){
            _id
        }
    }
`

const useProducts = () => {
    const [find, setFind] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchTimer, setSearchTimer] = useState<any>(null)
    const [, createProduct] = useMutation(CREATE_PRODUCT);
    const [, removeProduct] = useMutation(REMOVE_PRODUCT);
    const [{ data, fetching, error }, productsReexecuteQuery] = useQuery({
        query: PRODUCTS_QUERY,
        pause: true,
        variables: {
            findProductsInput: {
                name: find,
            }
        },
    });

    useEffect(() => {
        clearTimeout(searchTimer)
        if (find && find.length > 2) {
            setLoading(true)
            const searchFunction = () => setTimeout(() => {
                productsReexecuteQuery()
                setLoading(false)
            }, 1500)
            setSearchTimer(searchFunction())
        } else {
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [find, productsReexecuteQuery])

    return {
        products: data?.products || [],
        fetching: fetching || loading,
        error,
        findProducts: (find: string) => setFind(find),
        createProduct: (createProductInput: Omit<PRODUCT_SCHEMA_PROPS, '_id'>) => createProduct({ createProductInput }),
        removeProduct: (_id: string) => removeProduct({ _id }),
    }
}

export default useProducts;