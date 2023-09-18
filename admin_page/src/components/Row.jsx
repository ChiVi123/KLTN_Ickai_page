import cx from 'classnames';
import PropTypes from 'prop-types';

function Row({
    children,
    cols,
    colsSm,
    colsMd,
    colsLg,
    colsXl,
    colsXxl,
    g,
    gx,
    gy,
    center = false,
    sb = false,
    noSide = false,
    classes,
}) {
    return (
        <div
            className={cx('row', {
                [`row-cols-${cols}`]: cols,
                [`row-cols-sm-${colsSm}`]: colsSm,
                [`row-cols-md-${colsMd}`]: colsMd,
                [`row-cols-lg-${colsLg}`]: colsLg,
                [`row-cols-xl-${colsXl}`]: colsXl,
                [`row-cols-xxl-${colsXxl}`]: colsXxl,
                [`g-${g}`]: g || g === 0,
                [`gx-${gx}`]: gx || gx === 0,
                [`gy-${gy}`]: gy || gy === 0,
                center,
                sb,
                'no-gutter-side': noSide,
                [classes]: classes,
            })}
        >
            {children}
        </div>
    );
}

Row.propTypes = {
    children: PropTypes.node,
    cols: PropTypes.number,
    colsSm: PropTypes.number,
    colsMd: PropTypes.number,
    colsLg: PropTypes.number,
    colsXl: PropTypes.number,
    colsXxl: PropTypes.number,
    g: PropTypes.number,
    gx: PropTypes.number,
    gy: PropTypes.number,
    center: PropTypes.bool,
    sb: PropTypes.bool,
    classes: PropTypes.string,
};

export default Row;
