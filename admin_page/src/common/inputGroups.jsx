import * as autoCompletes from './autoCompletes';
import * as inputNames from './inputNames';
import * as labels from './labels';
import * as placeholders from './placeholders';
import * as types from './types';

const email = {
    type: types.email,
    inputName: inputNames.email,
    label: labels.email,
    placeholder: placeholders.email,
    autoComplete: autoCompletes.email,
};
const password = {
    type: types.password,
    inputName: inputNames.password,
    label: labels.password,
    placeholder: placeholders.password,
    autoComplete: autoCompletes.off,
};
const name = {
    type: types.text,
    inputName: inputNames.name,
    label: labels.name,
    placeholder: placeholders.name,
    autoComplete: autoCompletes.name,
};
const productName = {
    type: types.text,
    inputName: inputNames.name,
    label: labels.productName,
    placeholder: placeholders.productName,
    autoComplete: autoCompletes.name,
    props: {},
};

export const login = [email, password];
export const profile = [name];
export const product = [
    productName,
    {
        type: types.number,
        inputName: inputNames.price,
        label: labels.price,
        placeholder: placeholders.price,
        autoComplete: autoCompletes.off,
        props: { step: 1 },
    },
    {
        type: types.number,
        inputName: inputNames.sale,
        label: labels.sale,
        placeholder: placeholders.sale,
        autoComplete: autoCompletes.off,
        props: { step: 0.1 },
    },
    {
        type: types.number,
        inputName: inputNames.quantity,
        label: labels.quantity,
        placeholder: placeholders.quantity,
        autoComplete: autoCompletes.off,
        props: { step: 1 },
    },
];
