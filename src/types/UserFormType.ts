import { User } from "./UserType"

export type UserFormType = {
    formChangeHandler?: (key: string, value: string | boolean) => void,
    formData?: User,
}