import BaseDialogCreateProduct from "./DialogCreateProduct";

export interface DialogCreateProductProps {
    children: any
    created: (arg0: string) => void
    defaultBarcode?: string | number
}

const DialogCreateProduct = (props: DialogCreateProductProps) => <BaseDialogCreateProduct {...props} />

export default DialogCreateProduct;