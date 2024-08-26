import { User } from "./UserType";

export type ModalType = {
    showModal: boolean,
    onCloseHandler: () => void,
    yesHandler: () => void
    formChangeHandler?: (key: string, value: string | boolean) => void,
    formData?: User,
    title?:string,
    modalBody: 'form' | 'delete-confirmation'
}