import cx from 'classnames';
import PropTypes from 'prop-types';

function TextField({
    type = 'text',
    id = 'firstName',
    label = 'firstName',
    name = 'firstName',
    placeholder = 'First Name...',
    autoComplete = 'off',
    required = false,
    disabled = false,
    register = (name) => ({ name }),
    errors = {},
    ...passProps
}) {
    const props = { ...passProps };

    return (
        <div className='text-field'>
            <label
                htmlFor={id}
                className={cx('text1 text-field__label', {
                    invalid: errors[name],
                })}
            >
                {label}
                <span className='invalid'>{required && ' *'}</span>
            </label>
            <div
                className={cx('text-field__wrap', {
                    'text-field__wrap--invalid': errors[name],
                    'text-field__wrap--disabled': disabled,
                })}
            >
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className='text1 text-field__input'
                    autoComplete={autoComplete}
                    disabled={disabled}
                    {...props}
                    {...register(name)}
                />
            </div>
            <span className='text2 text-field__message invalid'>
                {errors[name]?.message}
            </span>
        </div>
    );
}

TextField.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    register: PropTypes.func,
    errors: PropTypes.object,
};

export default TextField;
