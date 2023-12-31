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
    alignItems = '',
    center = false,
    sb = false,
    noSide = false,
    classes,
    component,
    ...props
}) {
    let Component = 'div';

    if (component) {
        Component = component;
    }
    return (
        <Component
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
                [`align-items-${alignItems}`]: alignItems,
                'no-gutter-side': noSide,
                [classes]: classes,
            })}
            {...props}
        >
            {children}
        </Component>
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
