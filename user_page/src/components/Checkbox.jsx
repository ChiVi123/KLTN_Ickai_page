import cx from 'classnames';
import { useState } from 'react';
import { CheckIcon } from '~/icons';
import Typography from './Typography';

function Checkbox({
    id,
    name,
    label,
    initValue = false,
    value,
    clear,
    onChange = () => {},
    classes,
}) {
    const [isChecked, setIsChecked] = useState(initValue);

    const handleChange = (value) => {
        setIsChecked((prev) => {
            return !prev;
        });

        onChange(value);
    };

    return (
        <label
            htmlFor={id}
            className={cx('check', {
                'check--clear': clear,
                [classes]: classes,
            })}
        >
            <input
                type='checkbox'
                name={name}
                id={id}
                className='check-input'
                hidden
                checked={isChecked}
                value={value}
                onChange={() => handleChange(value)}
            />
            <span className='check-custom'>
                <CheckIcon classes='check-icon' />
            </span>
            <Typography variant='text1'>{label}</Typography>
        </label>
    );
}

export default Checkbox;
