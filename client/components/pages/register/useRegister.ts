import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserSchema, CreateUserSchemaProps } from "../../../schema/user.schema";
import { useNotify } from "../../../hooks/useNotify";
import { useMutation } from "urql";
import { omit } from "lodash";
import useCommon from "../../../hooks/useCommon";

const CREATE_USER = `
    mutation createUser ($createUserInput: CreateUserInput!) {
        createUser (createUserInput: $createUserInput) {
            _id
        }
    }
`;

const useRegister = () => {
    const { t, router } = useCommon()
    const { success, error } = useNotify()
    const [date, setDate] = useState(new Date())
    const [{ fetching }, createUser] = useMutation(CREATE_USER);

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<CreateUserSchemaProps>({
        resolver: zodResolver(CreateUserSchema)
    })

    const registerUser = async (createUserInput: CreateUserSchemaProps) => {
        try {
            if (!createUserInput.rules) {
                return error('ACCEPT_RULES');
            }

            await createUser({
                createUserInput: omit(
                    createUserInput,
                    ['passwordConfirmation', 'rules']
                )
            })
                .then(result => {
                    if (result.error) {
                      return error(result.error.message);
                    }
                    success('CHECK_YOUR_EMAIL')
                    router.push(`/login`);
                })
        } catch (e: any) {
            error(e.response)
        }
    }

    return { registerUser, t, fetching, register, errors, handleSubmit, date, setDate, setValue }
}

export type useRegisterProps = ReturnType<typeof useRegister>

export default useRegister;