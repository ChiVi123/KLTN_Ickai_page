import Typography from './Typography';

function FormGroup({
    children,
    name,
    label,
    isLabel = true,
    isRequired,
    errors,
}) {
    return (
        <div className='form-group'>
            {isLabel && (
                <label htmlFor={name} className='label-input'>
                    {label}
                    <span>{isRequired && ' *'}</span>
                </label>
            )}
            {children}
            <Typography variant='text3' classes='invalid-message'>
                {errors && errors[name]?.message}
            </Typography>
        </div>
    );
}

export default FormGroup;
