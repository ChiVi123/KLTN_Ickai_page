import cx from 'classnames';
import PropTypes from 'prop-types';
import { toArray } from '~/utils/funcs';

function Col({
    children,
    baseCols,
    baseColsSm,
    baseColsMd,
    baseColsLg,
    baseColsXl,
    offset,
    classes,
    component,
    ...props
}) {
    const infix = baseCols ? `-${baseCols}` : '';
    const Component = component || 'div';

    return (
        <Component
            className={cx(`col${infix}`, {
                [`col-sm-${baseColsSm}`]: baseColsSm,
                [`col-md-${baseColsMd}`]: baseColsMd,
                [`col-lg-${baseColsLg}`]: baseColsLg,
                [`col-xl-${baseColsXl}`]: baseColsXl,
                [`offset-${offset}`]: offset || offset === 0,
                [classes]: classes,
            })}
            {...props}
        >
            {children}
        </Component>
    );
}

Col.propTypes = {
    children: PropTypes.node,
    baseCols: PropTypes.number,
    baseColsSm: PropTypes.number,
    baseColsMd: PropTypes.number,
    baseColsLg: PropTypes.number,
    baseColsXl: PropTypes.number,
    baseColsXxl: PropTypes.number,
    offset: PropTypes.oneOf([0, ...toArray(11)]),
    classes: PropTypes.string,
};

export default Col;
