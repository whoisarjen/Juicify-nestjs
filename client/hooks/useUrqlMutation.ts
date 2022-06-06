import { CombinedError, useMutation } from "urql";
import { useNotify } from "./useNotify";

const useUrqlMutation = (mutation: string) => {
	const { error } = useNotify()
    const [result, query] = useMutation(mutation);

	return [
		result,
		async body => await query(body).then(result => {
			if (result.error) {
				error(result.error.message.replace('[GraphQL] ', ''))
				return null
			}
			return result
		})
	] as [{ data: any; fetching: boolean; error: CombinedError | undefined; }, (arg0: object) => any]
}

export default useUrqlMutation;