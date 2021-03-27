
import * as Yup from 'yup';

export const validations = Yup.object({
    summary: Yup.string()
        .required(),
    description: Yup.string()
        .required(),
    dueDate: Yup.string()
        .required(),
})
