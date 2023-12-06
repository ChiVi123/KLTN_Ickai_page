import { useSearchParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { createObjectParams } from '~/utils/funcs';

function SortSelect({ options = [], defaultValue = '' }) {
    const [, setSearchParams] = useSearchParams();
    const handleSelect = ({ value }) => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            sortBy: value,
        }));
    };

    return (
        <ReactSelect
            options={options}
            onChange={handleSelect}
            placeholder='Sắp xếp theo...'
            defaultValue={options.find((item) => item.value === defaultValue)}
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
                    padding: '6px 8px',
                    background: 'transparent',
                    color: 'var(--text-1-color)',
                }),
            }}
        />
    );
}

export default SortSelect;
