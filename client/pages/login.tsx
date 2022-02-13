import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch } from "../hooks/useRedux";
import { setToken } from "../redux/features/token.slice";
import useTranslation from "next-translate/useTranslation";
import { readToken } from "../utils/auth.utils";
import { createIndexedDB, addIndexedDB } from "../utils/indexedDB.utils";
import { getShortDate } from "../utils/date.utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSessionSchema, CreateSessionSchemaProps } from '../schema/session.schema'
import styled from 'styled-components'
import Logo from "../components/common/Logo";

const Form = styled.form`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    a{
        text-align: center;
    }
`

const LogoWrapper = styled.div`
    margin: auto;
    padding: 10px;
    max-width: 180px;
`

const Login = () => {
    const router = useRouter();
    const { t } = useTranslation()
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm<CreateSessionSchemaProps>({
        resolver: zodResolver(CreateSessionSchema)
    })

    const onSubmit = async (values: CreateSessionSchemaProps) => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, values, { withCredentials: true });
            await createIndexedDB()
            const keys = Object.keys(response.data)
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] != 'token' && keys[i] != 'refresh_token') {
                    await addIndexedDB(keys[i], response.data[keys[i]])
                }
            }
            const tokenValue = await readToken(response.data.token)
            localStorage.setItem('token', JSON.stringify(tokenValue))
            dispatch(setToken(tokenValue));
            router.push(`/${tokenValue.login}/nutrition-diary/${getShortDate()}`);
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <LogoWrapper>
                <Logo size={180} />
            </LogoWrapper>
            <Stack direction="column" spacing={2}>
                <TextField
                    variant="outlined"
                    label={t("auth:LOGIN")}
                    type="text"
                    {...register('login')}
                    error={typeof errors.login === 'undefined' ? false : true}
                    helperText={
                        errors.login?.message &&
                        errors.login?.message.length &&
                        errors.login?.message
                    }
                />
                <TextField
                    type="password"
                    variant="outlined"
                    label={t("auth:PASSWORD")}
                    {...register('password')}
                    error={typeof errors.password === 'undefined' ? false : true}
                    helperText={
                        errors.password?.message &&
                        errors.password?.message.length &&
                        errors.password?.message
                    }
                />
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                >
                    {t("auth:SIGN_IN")}
                </LoadingButton>
                <Link passHref href="/reset-password">
                    {t("auth:FORGOT_PASSWORD_RESET_IT")}
                </Link>
            </Stack>
            <Link passHref href="/register">
                <LoadingButton
                    color="success"
                    style={{ marginTop: 'auto !important', marginBottom: 'auto !important' }}
                    variant="contained"
                >
                    {t("auth:FIRST_TIME_CREATE_ACCOUNT")}
                </LoadingButton>
            </Link>
        </Form>
    );
};

export default Login;
