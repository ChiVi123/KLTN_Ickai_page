import cx from 'classnames';
import PropTypes from 'prop-types';
import { useReducer } from 'react';
import { types } from '~/common';
import { MinusIcon, PlusIcon } from '~/icons';
import { logger } from '~/utils/logger';

function reducer(state, action) {
    switch (action.type) {
        case 'plus':
            return {
                ...state,
                quantity: state.quantity + 1,
            };

        case 'minus':
            return {
                ...state,
                quantity: state.quantity - 1,
            };

        case 'reset':
            return {
                ...state,
                quantity: 1,
            };
        default:
            return { ...state };
    }
}

function InputQuantity({
    id = 'quantity',
    name = 'quantity',
    initValue = 1,
    onChange = () => {},
}) {
    const isLogger = false;
    const [state, dispatch] = useReducer(reducer, { quantity: initValue });

    const handleMinus = () => {
        if (state.quantity === 1) return;

        const action = { type: 'minus' };
        const nextState = reducer(state, action);
        dispatch(action);
        onChange(nextState?.quantity || 1);
    };
    const handlePlus = () => {
        const action = { type: 'plus' };
        const nextState = reducer(state, action);
        dispatch(action);
        onChange(nextState?.quantity || 1);
    };

    if (isLogger) {
        logger({ groupName: InputQuantity.name, values: [initValue] });
    }

    return (
        <div className='quantity'>
            <button
                type='button'
                aria-label='minus'
                onClick={handleMinus}
                className={cx('quantity__btn', {
                    'quantity__btn--disable':
                        state?.quantity && state.quantity === 1,
                })}
            >
                <MinusIcon />
            </button>
            <input
                type={types.number}
                id={id}
                name={name}
                value={state?.quantity || 1}
                disabled
                className='quantity__input'
                onChange={() => {}}
            />
            <button
                type='button'
                aria-label='plus'
                onClick={handlePlus}
                className='quantity__btn'
            >
                <PlusIcon />
            </button>
        </div>
    );
}

InputQuantity.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    initValue: PropTypes.number,
};

export default InputQuantity;
