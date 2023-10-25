import cx from 'classnames';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { types } from '~/common';
import { MinusIcon, PlusIcon } from '~/icons';
import { logger } from '~/utils/logger';

function InputQuantity({
    id = 'quantity',
    name = 'quantity',
    initValue = 1,
    onChange = () => {},
}) {
    const isLogger = false;
    const inputRef = useRef({ value: initValue });

    const handleMinus = () => {
        let value = parseInt(inputRef.current.value);

        if (value === 1) return;

        inputRef.current.value = --value;
        onChange(value);
    };
    const handlePlus = () => {
        let value = parseInt(inputRef.current.value);

        inputRef.current.value = ++value;
        onChange(value);
    };

    if (isLogger) {
        logger({
            groupName: InputQuantity.name,
            values: [inputRef.current.value],
        });
    }

    return (
        <div className='quantity'>
            <button
                type='button'
                aria-label='minus'
                onClick={handleMinus}
                className={cx('quantity__btn', {
                    'quantity__btn--disable':
                        parseInt(inputRef.current.value) === 1,
                })}
            >
                <MinusIcon />
            </button>
            <input
                ref={inputRef}
                type={types.number}
                id={id}
                name={name}
                defaultValue={initValue}
                disabled
                className='quantity__input'
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
