import Stack from '@mui/material/Stack'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const MobileDatePickerExport = ({ change }) => {
    const [value, setValue] = useState(new Date())

    useEffect(() => change(value), [value])

    return (
        <div className="mobileDatePicker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <MobileDatePicker
                        label="Pick date"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
    )
}

export default MobileDatePickerExport