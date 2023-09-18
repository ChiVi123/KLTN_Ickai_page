import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind();

function Table({ children, classes, heads, isLoading }) {
    return (
        <table className={cx('table', { [classes]: classes })}>
            <thead>
                <tr>
                    {heads.map((head, index) => (
                        <th key={index}>{head}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}

Table.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.string,
    heads: PropTypes.array,
    isLoading: PropTypes.bool,
};

export default Table;
