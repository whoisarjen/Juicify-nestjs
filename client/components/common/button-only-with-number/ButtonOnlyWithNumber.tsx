import { useButtonOnlyWithNumberProps } from "./useButtonOnlyWithNumber";
import LoadingButton from '@mui/lab/LoadingButton';
import styled from 'styled-components'

const Button = styled.div`
    width: 100%;
    position: fixed;
    bottom: 56px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 2;
`

const Placeholder = styled.div`
    width: 100%;
    height: 44px;
`

const BaseButtonOnlyWithNumber = ({ clicked, text = 'Submit', showNumber, t }: useButtonOnlyWithNumberProps) => {

    if (!showNumber) {
        return <></>
    }

    return (
        <>
            <Placeholder />
            <Button>
                <LoadingButton
                    onClick={clicked}
                    variant="contained"
                    type="submit"
                >
                    {t(text)}{showNumber > 0 && ` (${showNumber})`}
                </LoadingButton>
            </Button>
        </>
    )
}

export default BaseButtonOnlyWithNumber;