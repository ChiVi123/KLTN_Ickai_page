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
    baseColsXxl,
    offset,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    offsetXxl,
    classes,
    component,
    ...passProps
}) {
    const infix = baseCols || baseCols === 0 ? `-${baseCols}` : '';
    const Component = component || 'div';
    const props = { ...passProps };

    return (
        <Component
            className={cx(`col${infix}`, {
                [`col-sm-${baseColsSm}`]: baseColsSm || baseColsSm === 0,
                [`col-md-${baseColsMd}`]: baseColsMd || baseColsMd === 0,
                [`col-lg-${baseColsLg}`]: baseColsLg || baseColsLg === 0,
                [`col-xl-${baseColsXl}`]: baseColsXl || baseColsXl === 0,
                [`col-xxl-${baseColsXxl}`]: baseColsXxl || baseColsXxl === 0,
                [`offset-${offset}`]: offset || offset === 0,
                [`offset-sm-${offsetSm}`]: offsetSm || offsetSm === 0,
                [`offset-md-${offsetMd}`]: offsetMd || offsetMd === 0,
                [`offset-lg-${offsetLg}`]: offsetLg || offsetLg === 0,
                [`offset-xl-${offsetXl}`]: offsetXl || offsetXl === 0,
                [`offset-xxl-${offsetXxl}`]: offsetXxl || offsetXxl === 0,
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
