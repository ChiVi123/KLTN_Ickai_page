import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { notifies } from '~/common';
import { Button } from '~/components';
import { userServices } from '~/services';

import styles from '~/scss/pages/users/user-item.module.scss';

const cx = classNames.bind(styles);

function UserItem({ user, callback }) {
    const isActive = user.state === 'active';
    let isDisplay = true;

    if (user.role === 'role_admin') {
        isDisplay = false;
    }

    if (user.state === 'not_verify') {
        isDisplay = false;
    }

    const handleIsActivate = async ({ id, state }) => {
        switch (state) {
            case 'active':
                const resultBlock = await userServices.adminBlockUserById({
                    id,
                });
                const messageBlockSuccess = 'Delete user success';

                if (resultBlock?.message === messageBlockSuccess) {
                    toast.success(notifies.blockUserSuccess);
                } else {
                    toast.error(notifies.blockUserFail);
                }
                break;
            case 'block':
                const resultActive = await userServices.adminUnblockUserById({
                    id,
                });
                const messageUnblockSuccess = 'Unblock user success';

                if (resultActive?.message === messageUnblockSuccess) {
                    toast.success(notifies.unblockUserSuccess);
                } else {
                    toast.error(notifies.unblockUserFail);
                }
                break;
            default:
                break;
        }

        if (callback) {
            callback();
        }
    };

    return (
        <tr>
            <td className={cx('td-id')} title={user.id}>
                {user.id}
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role.split('_')[1]}</td>
            <td>
                {isDisplay && (
                    <Button
                        color={isActive ? 'primary' : 'second'}
                        onClick={() => handleIsActivate(user)}
                    >
                        <FontAwesomeIcon
                            icon={isActive ? faLockOpen : faLock}
                        />
                    </Button>
                )}
            </td>
        </tr>
    );
}

UserItem.propTypes = {
    callback: PropTypes.func,
};

export default UserItem;
