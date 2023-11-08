import * as autoCompletes from './autoCompletes';
import * as inputNames from './inputNames';
import * as labels from './labels';
import * as placeholders from './placeholders';
import * as types from './types';

export const product = [
    {
        type: types.text,
        inputName: inputNames.name,
        label: labels.productName,
        placeholder: placeholders.productName,
        autoComplete: autoCompletes.name,
        props: {},
    },
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
