import cx from 'classnames';
import PropTypes from 'prop-types';

function TableData({ children, classes }) {
    return (
        <td
            className={cx('t-data', {
                [classes]: classes,
            })}
        >
            {children}
        </td>
    );
}

TableData.propTypes = { children: PropTypes.node, classes: PropTypes.string };

export default TableData;
