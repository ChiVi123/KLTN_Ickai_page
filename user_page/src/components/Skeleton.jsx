import cx from 'classnames';

function Skeleton({
    children,
    ready = false,
    variant = '',
    animation = 'pulsate',
    height = '40px',
    classes = '',
    ...passStyles
}) {
    return (
        <>
            {ready ? (
                children
            ) : (
                <div
                    className={cx('skeleton', {
                        [`skeleton--${variant}`]: variant,
                        [animation]: animation,
                        [classes]: classes,
                    })}
                    style={{ height, ...passStyles }}
                ></div>
            )}
        </>
    );
}

export default Skeleton;
