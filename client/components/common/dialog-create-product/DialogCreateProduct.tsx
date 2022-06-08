import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import styled from 'styled-components'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DialogCreateProductProps } from '.';
import { useNotify } from '../../../hooks/useNotify';
import { PRODUCT_SCHEMA_PROPS, ProductSchema } from '../../../schema/product.schema';
import useProducts from '../../../hooks/useProducts';
import useCommon from '../../../hooks/useCommon';

const ButtonHolder = styled.div`
    width: 100%;
    display: grid;
`

const BaseDialogCreateProduct = ({ children, created, defaultBarcode }: DialogCreateProductProps) => {
    const { t } = useCommon()
    const [barcode, setBarcode] = useState(defaultBarcode)
    const [loading, setLoading] = useState(false)
    const { error } = useNotify()
    const [isDialog, setIsDialog] = useState(false)
    const { createProduct } = useProducts()

    const { register, formState: { errors }, handleSubmit } = useForm<Omit<PRODUCT_SCHEMA_PROPS, 'id'>>({
        resolver: zodResolver(ProductSchema.omit({ id: true }))
    })

    const onSubmit = async (values: Omit<PRODUCT_SCHEMA_PROPS, 'id'>) => {
        try {
            await createProduct({ ...values, ...(barcode && { barcode: barcode as number }) })
            created(values.name)
            setIsDialog(false)
        } catch (e: any) {
            error(e.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (defaultBarcode) {
            setIsDialog(true)
        }
    }, [defaultBarcode])

    return (
        <>
            <ButtonHolder onClick={() => setIsDialog(true)}>{children}</ButtonHolder>
            <Dialog open={isDialog}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{t('Create product')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('Create product description')}
                        </DialogContentText>
                        <TextField
                            type="text"
                            fullWidth
                            variant="standard"
                            label={t('Name of product')}
                            {...register('name')}
                            error={typeof errors.name === 'undefined' ? false : true}
                            helperText={errors.name?.message && t(`notify:${errors.name.message || ''}`)}
                        />
                        {
                            defaultBarcode &&
                            <TextField
                                margin="dense"
                                id="name"
                                label="Barcode"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)}
                                type="Number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                fullWidth
                                variant="standard"
                            />
                        }
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Proteins')}
                            {...register('proteins')}
                            error={typeof errors.proteins === 'undefined' ? false : true}
                            helperText={errors.proteins?.message && t(`notify:${errors.proteins.message || ''}`)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Carbs')}
                            {...register('carbs')}
                            error={typeof errors.carbs === 'undefined' ? false : true}
                            helperText={errors.carbs?.message && t(`notify:${errors.carbs.message || ''}`)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Sugar')}
                            {...register('sugar')}
                            error={typeof errors.sugar === 'undefined' ? false : true}
                            helperText={errors.sugar?.message && t(`notify:${errors.sugar.message || ''}`)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Fats')}
                            {...register('fats')}
                            error={typeof errors.fats === 'undefined' ? false : true}
                            helperText={errors.fats?.message && t(`notify:${errors.fats.message || ''}`)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Fiber')}
                            {...register('fiber')}
                            error={typeof errors.fiber === 'undefined' ? false : true}
                            helperText={errors.fiber?.message && t(`notify:${errors.fiber.message || ''}`)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Salt')}
                            {...register('salt')}
                            error={typeof errors.salt === 'undefined' ? false : true}
                            helperText={errors.salt?.message && t(`notify:${errors.salt.message || ''}`)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Ethanol')}
                            {...register('ethanol')}
                            error={typeof errors.ethanol === 'undefined' ? false : true}
                            helperText={errors.ethanol?.message && t(`notify:${errors.ethanol.message || ''}`)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    {...register('is_expecting_check')}
                                />
                            }
                            label={t('Should be available for all?')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDialog(false)}>{t('Cancel')}</Button>
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {t('Submit')}
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default BaseDialogCreateProduct;