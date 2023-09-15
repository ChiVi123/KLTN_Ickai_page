import cx from 'classnames';
import Typography from './Typography';

function Radio({ children, id, name, value, classes, register = () => ({}) }) {
    return (
        <label
            htmlFor={id}
            className={cx('radio', {
                [classes]: classes,
            })}
        >
            <input
                type='radio'
                id={id}
                hidden
                value={value}
                className='radio-input'
                {...register(name)}
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
