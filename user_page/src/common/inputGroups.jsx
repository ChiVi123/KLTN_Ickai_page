import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPal, VNPay } from '~/icons';
import * as autoCompletes from './autoCompletes';
import * as inputNames from './inputNames';
import * as labels from './labels';
import * as placeholders from './placeholders';
import * as types from './types';

const email = {
    type: types.email,
    label: labels.email,
    inputName: inputNames.email,
    placeholder: placeholders.email,
    autoComplete: autoCompletes.email,
};
const password = {
    type: types.password,
    label: labels.password,
    inputName: inputNames.password,
    placeholder: placeholders.password,
    autoComplete: autoCompletes.off,
};
const name = {
    type: types.text,
    label: labels.name,
    inputName: inputNames.name,
    placeholder: placeholders.name,
    autoComplete: autoCompletes.name,
};
const phone = {
    type: types.phone,
    label: labels.phone,
    inputName: inputNames.phone,
    placeholder: placeholders.phone,
    autoCompletes: autoCompletes.off,
};

export const login = [email, password];
export const register = [
    {
        type: types.text,
        label: labels.name,
        inputName: inputNames.name,
        placeholder: placeholders.name,
        autoComplete: autoCompletes.name,
    },
    email,
    password,
    {
        type: types.password,
        label: labels.passwordConfirm,
        inputName: inputNames.passwordConfirm,
        placeholder: placeholders.passwordConfirm,
        autoComplete: autoCompletes.off,
    },
];
export const profile = [name, { ...email, disabled: true }, phone];
export const checkout = [
    {
        type: types.text,
        inputName: inputNames.email,
        label: labels.email,
        placeholder: placeholders.email,
        isDisable: true,
    },
    {
        type: types.text,
        inputName: inputNames.name,
        label: 'Tên người nhận',
        placeholder: 'Nhập tên...',
        isDisable: false,
    },
    {
        type: types.text,
        inputName: inputNames.phone,
        label: labels.phone,
        placeholder: placeholders.phone,
        isDisable: false,
    },
];
export const payments = [
    {
        name: inputNames.payment,
        icon: <PayPal />,
        text: 'PayPal',
        value: 'paypal',
    },
    {
        name: inputNames.payment,
        icon: <VNPay />,
        text: 'VNPAY',
        value: 'vnpay',
    },
    {
        name: inputNames.payment,
        icon: <FontAwesomeIcon icon={faMoneyBill} />,
        text: 'COD',
        value: 'cod',
    },
];
