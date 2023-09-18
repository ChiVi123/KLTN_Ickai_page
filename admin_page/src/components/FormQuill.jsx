import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import '~/scss/vendors/quill.scss';

function FormQuill({
    name = '',
    placeholder = '',
    control,
    theme = '',
    modules,
    formats,
}) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <ReactQuill
                    theme={theme}
                    value={value}
                    onChange={onChange}
                    formats={formats}
                    modules={modules}
                    placeholder={placeholder}
                />
            )}
        />
    );
}

FormQuill.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    theme: PropTypes.string,
    modules: PropTypes.object,
    formats: PropTypes.array,
};

FormQuill.defaultProps = {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ],
    },
    formats: ['header', 'bold', 'italic', 'underline', 'strike'],
};

export default FormQuill;
