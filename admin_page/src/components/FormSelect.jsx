import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select';

function FormSelect({
    name,
    options,
    label,
    value,
    isDisable,
    control,
    placeholder,
    defaultValue,
}) {
    const Option = ({ children, ...props }) => {
        const { data } = props;
        const { Control } = components;

        props.value = data[value];

        return <Control {...props}>{children || data[label]}</Control>;
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => (
                <Select
                    options={options}
                    components={{
                        Option: Option,
                    }}
                    getOptionLabel={(option) => option[label]}
                    defaultValue={defaultValue}
                    onChange={(option) =>
                        onChange({ value: option[value], label: option[label] })
                    }
                    isDisabled={isDisable}
                    placeholder={placeholder}
                    styles={{
                        input: (baseStyle) => ({
                            ...baseStyle,
                            color: 'var(--text-1-color)',
                        }),
                        singleValue: (baseStyle) => ({
                            ...baseStyle,
                            color: 'var(--text-1-color)',
                        }),
                        menu: (baseStyle) => ({
                            ...baseStyle,
                            background: 'var(--bg-color)',
                            zIndex: '2',
                        }),
                        control: (baseStyle) => ({
                            ...baseStyle,
                            padding: '0 8px',
                            background: 'transparent',
                            color: 'var(--text-1-color)',
                        }),
                    }}
                />
            )}
        />
    );
}

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    children: PropTypes.node,
    label: PropTypes.string,
    value: PropTypes.string,
};

FormSelect.defaultProps = {
    label: 'label',
    value: 'value',
};

export default FormSelect;
