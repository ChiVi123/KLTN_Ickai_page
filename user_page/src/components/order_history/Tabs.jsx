import classNames from 'classnames/bind';
import { Typography } from '~/components';
import styles from '~order-history/tabs.module.scss';

const cx = classNames.bind(styles);

function Tabs({ tabs, tab, onClick }) {
    return (
        <div className={cx('tabs')}>
            {tabs.map((item, index) => (
                <Typography
                    key={index}
                    variant='text2'
                    center
                    classes={cx('tab', {
                        'tab--active': item.content === tab.content,
                    })}
                    onClick={() => onClick(item)}
                >
                    {item.content}
                </Typography>
            ))}
        </div>
    );
}

export default Tabs;
