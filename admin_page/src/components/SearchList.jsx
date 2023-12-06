import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { inputNames, keys, schemas } from '~/common';

function SearchList({ placeholder }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schemas.searchList),
        defaultValues: {
            query: searchParams.get(keys.query) || '',
        },
    });

    const handleOnSubmit = (data) => {
        setSearchParams({ ...data });
    };

    return (
        <div className='search-list'>
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className='search-list__form'
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className='search-list__icon'
                />
                <input
                    id={inputNames.query}
                    type='text'
                    autoComplete='off'
                    placeholder={placeholder}
                    className='search-list__input'
                    {...register(inputNames.query)}
                />
            </form>
        </div>
    );
}

export default SearchList;
