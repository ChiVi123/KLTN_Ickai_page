import * as yup from 'yup';
import {
    addressRequired,
    contentRequired,
    districtRequired,
    emailFormat,
    emailRequired,
    leastCharacter,
    nameRequired,
    otpNotNumber,
    otpRequired,
    passwordConfirmMatch,
    passwordConfirmRequired,
    passwordLengthEight,
    passwordRequired,
    phoneFormat,
    priceProperly,
    provinceRequired,
    quantityNotNumber,
    starRequired,
    wardRequired,
} from './errorMessages';

const minEight = 8;
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const phone = yup.string().matches(phoneRegExp, phoneFormat);
const otp = yup.number().required(otpRequired).typeError(otpNotNumber);
// const price = yup
//     .number(priceProperly)
//     .typeError(priceProperly)
//     .positive(priceProperly)
//     .required(priceProperly);
const price = yup
    .number(priceProperly)
    .typeError(priceProperly)
    .required(priceProperly)
    .test(
        'greater than or equal to zero',
        priceProperly,
        (value) => value >= 0,
    );

export const login = yup.object({
    email: yup.string().trim().required(emailRequired).email(emailFormat),
    password: yup.string().required(passwordRequired),
});

export const register = yup.object({
    name: yup.string().trim().required(nameRequired),
    email: yup.string().required(emailRequired).email(emailFormat),
    password: yup
        .string()
        .required(passwordRequired)
        .min(minEight, leastCharacter),
    passwordConfirm: yup
        .string()
        .required(passwordConfirmRequired)
        .oneOf([yup.ref('password'), null], passwordConfirmMatch),
});

export const profile = yup.object({
    name: yup.string().required(nameRequired),
    email: yup.string().required(emailRequired),
    phone,
});

export const makeOrder = yup.object({
    name: yup.string().trim().required(nameRequired),
    email: yup.string().trim().required(emailRequired),
    phone,
    province: yup.object().required(provinceRequired),
    district: yup.object().required(districtRequired),
    ward: yup.object().required(wardRequired),
    address: yup.string().trim().required(addressRequired),
});

export const sendOTP = yup.object({
    email: yup.string().trim().required(emailRequired).email(emailFormat),
});

export const confirmOTP = yup.object({
    otp,
});

export const confirmOTPRegister = yup.object({
    email: yup.string().trim().required(emailRequired).email(emailFormat),
    otp,
});

export const resetPassword = yup.object({
    password: yup
        .string()
        .required(passwordRequired)
        .min(minEight, passwordLengthEight),
});

export const productDetailQuantity = yup.object({
    quantity: yup.number().required().typeError(quantityNotNumber),
});

export const filterPrice = yup.object({
    minPrice: price,
    maxPrice: price.moreThan(yup.ref('minPrice'), priceProperly),
});

export const review = yup.object({
    rate: yup.number().min(1, starRequired),
    content: yup.string().required(contentRequired),
});

export const changePassword = yup.object({
    oldpass: yup.string().required(passwordRequired),
    newpass: yup.string().min(8, leastCharacter).required(passwordRequired),
});
