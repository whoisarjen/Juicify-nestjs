import { useMutation } from "urql";
import { PRODUCT } from './useProducts'
import useUrqlQuery from "./useUrqlQuery";

const CONSUMED = `
	id
	meal
	how_many
	date
	product {
		${PRODUCT}
	}
`

const CONSUMED_QUERY = `
	query userConsumedPerDay ($findUserConsumedInput: FindUserConsumedInput!) {
		userConsumedPerDay(findUserConsumedInput: $findUserConsumedInput) {
			user {
				id
				login
			}
			consumed {
				${CONSUMED}
			}
		}
	}
`

const CREATE_CONSUMED = `
	mutation createConsumed($createConsumedInput: CreateConsumedInput!){
		createConsumed(createConsumedInput: $createConsumedInput){
			${CONSUMED}
		}
	}
`

const REMOVE_CONSUMED = `
`

export interface ConsumedProps {
	id: number
	user: number
	product: number
	how_many: number
	meal: number
	date: string
}

const useConsumed = () => {
    const [, createConsumed] = useMutation(CREATE_CONSUMED);
    // // const [, removeConsumed] = useMutation(REMOVE_CONSUMED);

	const [{ data, fetching, error }, reexecuteQuery] = useUrqlQuery({
		query: CONSUMED_QUERY,
		pause: true,
	})

	return {
		data,
		fetching,
		error,
        findDay: ({ date, login }: { date: string, login: string }) => reexecuteQuery({ findUserConsumedInput: { date, login } }),
        // removeConsumed: (id: string) => removeConsumed({ id }),
        createConsumed: async (createConsumedInput: Omit<ConsumedProps, 'id'>) => createConsumed({ createConsumedInput }),
	}
}

export default useConsumed;