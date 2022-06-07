import { useEffect, useState } from "react";
import { CombinedError, useQuery } from "urql";
import { useNotify } from "./useNotify";

interface UseUrqlQueryProps {
	query: string
	pause?: boolean
	defaultVariables?: any
}

const useUrqlQuery = ({ query, pause = false, defaultVariables = null }: UseUrqlQueryProps) => {
	const { error: errorNotify } = useNotify()
	const [variables, setVariables] = useState(defaultVariables)
	const [{ data, fetching, error }, reexecuteQuery] = useQuery({
		query,
		pause,
		variables,
	});

	useEffect(() => {
		reexecuteQuery()
	}, [reexecuteQuery, variables])

	useEffect(() => {
		error?.message && variables !== null && errorNotify(error.message.replace('[GraphQL] ', ''))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error?.message])

	return [
		{ data, fetching, error },
		variables => setVariables(variables),
	] as [{ data: any; fetching: boolean; error: CombinedError | undefined; }, (arg0: any) => void]
}

export default useUrqlQuery;