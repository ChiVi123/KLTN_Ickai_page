import cx from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createObjectParams } from '~/utils/funcs';

function Tabs({ tabs = [] }) {
    const [tab, setTab] = useState('all');
    const [, setSearchParams] = useSearchParams();

    const handleClick = (value) => {
        setTab(value);
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            state: value === 'all' ? '' : value,
            page: 1,
        }));
    };

    return (
        <div className={cx('tabs')}>
            {tabs.map((item) => (
                <button
                    key={item.state}
                    type='button'
                    tabIndex='-1'
                    className={cx('tabs__item', {
                        'tabs__item--active': item.state === tab,
                    })}
                    onClick={() => handleClick(item.state)}
                >
                    <span className={cx('tabs__state')}>{item.content}</span>
                    <span
                        className={cx(
                            'tabs__count',
                            `tabs__count--${item.state}`,
                        )}
                    >
                        {item.count}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default Tabs;
