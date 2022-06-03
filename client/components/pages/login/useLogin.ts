import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateSessionSchemaProps, CreateSessionSchema } from "../../../schema/session.schema";
import useToken from "../../../hooks/useToken";
import useCommon from "../../../hooks/useCommon";
import { useQuery } from "urql";
import { useNotify } from "../../../hooks/useNotify";
import { isEmpty } from "lodash";
import { getShortDate } from "../../../utils/date.utils";
import { readToken } from "../../../utils/auth.utils";

const LOGIN = `
    query login ($loginUserInput: LoginUserInput!) {
        login (loginUserInput: $loginUserInput) {
            token
        }
    }
`

const useLogin = () => {
    const { error } = useNotify()
    const { t, router } = useCommon()
    const { dispatchToken } = useToken()
    const [variables, setVariables] = useState({})
    const [{ data, fetching, error: errorResponse }, login] = useQuery({
        query: LOGIN,
        pause: true,
        variables,
    });

    const { register, formState: { errors }, handleSubmit } = useForm<CreateSessionSchemaProps>({
        resolver: zodResolver(CreateSessionSchema)
    })

    useEffect(() => {
        const err = (errorResponse as any)?.graphQLErrors?.[0]?.originalError?.extensions?.exception?.response?.error
        err && error(err)
    }, [error, errorResponse])

    useEffect(() => {
        (async () => {
            if (data?.login) {
                await dispatchToken(data.login.token)
                router.push(`/${(await readToken(data.login.token)).login}/nutrition-diary/${getShortDate()}`)
            }
        })()
    }, [data, dispatchToken, router])

    useEffect(() => {
        !isEmpty(variables) && login()
    }, [login, variables])

    return {
        login: (loginUserInput: CreateSessionSchemaProps) => setVariables({ loginUserInput }),
        register,
        errors,
        handleSubmit,
        fetching,
        t
    }
}

export type useLoginProps = ReturnType<typeof useLogin>

export default useLogin;