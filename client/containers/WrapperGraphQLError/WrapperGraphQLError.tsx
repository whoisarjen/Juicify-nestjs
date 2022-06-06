import { useEffect } from "react";
import { useNotify } from "../../hooks/useNotify";

const prepareErrorMessage = (message: string) => message.replace("[GraphQL] ","")

interface WrapperGraphQLErrorProps {
	children: any
	message?: string
}

const WrapperGraphQLError = ({ children, message }: WrapperGraphQLErrorProps) => {
    const { error } = useNotify()

    useEffect(() => {
        message && error(prepareErrorMessage(message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

	return children
}

export default WrapperGraphQLError;