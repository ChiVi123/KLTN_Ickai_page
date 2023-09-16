import cx from 'classnames';
import Typography from './Typography';

function Radio({
    children,
    id,
    name,
    value,
    isChecked = false,
    onChange = () => {},
    classes,
}) {
    const handleChange = () => {
        onChange(value);
    };

    return (
        <label
            htmlFor={id}
            className={cx('radio', {
                [classes]: classes,
            })}
        >
            <input
                type='radio'
                name={name}
                id={id}
                className='radio-input'
                hidden
                checked={isChecked}
                value={value}
                onChange={handleChange}
            />
            <span className='radio-custom'></span>
            <Typography variant='text1' classes='radio-invisible'>
                {'label'}
            </Typography>
            <span className='radio-label'>{children}</span>
        </label>
    );
}

export default Radio;
