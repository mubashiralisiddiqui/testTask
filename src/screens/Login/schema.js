
import * as Yup from 'yup';

export const validations = Yup.object({
    email: Yup.string()
        .email("Not a valid e-mail")
        .required("E-mail is required")
        .trim(),
    password: Yup.string()
        .required('Password is required')
        .trim()
        .min(3)

})
