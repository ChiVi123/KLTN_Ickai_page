import * as yup from 'yup';
import {
    categoryRequired,
    descriptionRequired,
    emailFormat,
    emailRequired,
    imageRequired,
    isNumber,
    isPositive,
    nameRequired,
    notRatherOne,
    passwordRequired,
    priceRequired,
    required,
    saleRequired,
} from './errorMessages';

export const login = yup.object({
    email: yup.string().trim().required(emailRequired).email(emailFormat),
    password: yup.string().required(passwordRequired),
});
export const product = yup.object({
    name: yup.string().trim().required(nameRequired),
    price: yup
        .number(isNumber)
        .typeError(isNumber)
        .test({
            name: 'min',
            message: priceRequired,
            test: (value) => value > 0,
        }),
    sale: yup
        .number(isNumber)
        .typeError(isNumber)
        .min(0, isPositive)
        .max(1, notRatherOne),
    images: yup.array().required(imageRequired),
    description: yup.string().required(descriptionRequired),
    category: yup.object().required(categoryRequired),
    quantity: yup
        .number(isNumber)
        .typeError(isNumber)
        .test({
            name: 'min',
            message: saleRequired,
            test: (value) => value > 0,
        }),
});
export const category = yup.object({
    name: yup.string().trim().required(required),
});
