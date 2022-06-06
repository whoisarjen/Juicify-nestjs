import Link from "next/link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import Logo from "../../common/logo";
import DialogRules from "../../common/dialog-rules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserSchema, CreateUserSchemaProps } from "../../../schema/user.schema";
import { useNotify } from "../../../hooks/useNotify";
import { useMutation } from "urql";
import { omit } from "lodash";
import useCommon from "../../../hooks/useCommon";
import WrapperGraphQLError from "../../../containers/WrapperGraphQLError/WrapperGraphQLError";

const CREATE_USER = `
    mutation createUser ($createUserInput: CreateUserInput!) {
        createUser (createUserInput: $createUserInput) {
            id
        }
    }
`;

const Form = styled.div`
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
    display: grid;
`

const BaseRegister = () => {
    const { t, router } = useCommon()
    const { success, error } = useNotify()
    const [date, setDate] = useState(new Date())
    const [{ fetching, error: errorResponse }, createUser] = useMutation(CREATE_USER);

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<CreateUserSchemaProps>({
        resolver: zodResolver(CreateUserSchema)
    })

    const registerUser = async (createUserInput: CreateUserSchemaProps) => {
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
                    return
                }
                success('CHECK_YOUR_EMAIL')
                router.push(`/login`);
            })
    }

    return (
        <WrapperGraphQLError message={errorResponse?.message}>
            <Form onSubmit={handleSubmit(registerUser)}>
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
                        helperText={errors.login?.message && t(`notify:${errors.login.message || ''}`)}
                    />
                    <TextField
                        type="email"
                        variant="outlined"
                        label={t("auth:EMAIL")}
                        {...register('email')}
                        error={typeof errors.email === 'undefined' ? false : true}
                        helperText={errors.email?.message && t(`notify:${errors.email.message || ''}`)}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        label={t("auth:PASSWORD")}
                        {...register('password')}
                        data-testid="password"
                        error={typeof errors.password === 'undefined' ? false : true}
                        helperText={errors.password?.message && t(`notify:${errors.password.message || ''}`)}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        label={t("auth:PASSWORD_CONFIRMATION")}
                        {...register('passwordConfirmation')}
                        data-testid="confirmation"
                        error={typeof errors.passwordConfirmation === 'undefined' ? false : true}
                        helperText={errors.passwordConfirmation?.message && t(`notify:${errors.passwordConfirmation.message || ''}`)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            {...register('birth')}
                            label={t("auth:BIRTH")}
                            value={date}
                            onChange={(newValue: any) => {
                                setDate(newValue);
                                setValue('birth', newValue)
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        variant="outlined"
                        label={t("auth:HEIGHT")}
                        {...register('height')}
                        error={typeof errors.height === 'undefined' ? false : true}
                        helperText={errors.height?.message && t(`notify:${errors.height.message || ''}`)}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("auth:SEX")}</InputLabel>
                        <Select
                            {...register('sex')}
                            label={t("auth:SEX")}
                            defaultValue="true"
                            data-testid="sex"
                        >
                            <MenuItem value="true">{t("auth:MAN")}</MenuItem>
                            <MenuItem value="false">{t("auth:WOMAN")}</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogRules>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...register('rules')}
                                />
                            }
                            label={t('auth:I_AM_ACCEPTING_RULES')}
                        />
                    </DialogRules>
                    <LoadingButton
                        loading={fetching}
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit(registerUser)}
                    >
                        {t("auth:REGISTER")}
                    </LoadingButton>
                </Stack>
                <Link passHref href="/login">
                    <LoadingButton
                        color="success"
                        style={{ margin: 'auto 0' }}
                        variant="contained"
                    >
                        {t("auth:ONE_OF_US_SIGN_IN")}
                    </LoadingButton>
                </Link>
            </Form>
        </WrapperGraphQLError>
    );
};

export default BaseRegister;
