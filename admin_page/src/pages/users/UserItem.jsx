import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { notifies } from '~/common';
import { ButtonIcon } from '~/components';
import { userServices } from '~/services';

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
                const resultBlock = await userServices.blockUserById(id);
                const messageBlockSuccess = 'Delete user success';

                if (resultBlock?.message === messageBlockSuccess) {
                    toast.success(notifies.blockUserSuccess);
                } else {
                    toast.error(notifies.blockUserFail);
                }
                break;
            case 'block':
                const resultActive = await userServices.unblockUserById(id);
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
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.role.split('_')[1]}</td>
            <td>
                {isDisplay && (
                    <ButtonIcon
                        color={isActive ? 'primary' : 'second'}
                        onClick={() => handleIsActivate(user)}
                    >
                        <FontAwesomeIcon
                            icon={isActive ? faLockOpen : faLock}
                        />
                    </ButtonIcon>
                )}
            </td>
        </tr>
    );
}

UserItem.propTypes = {
    callback: PropTypes.func,
};

export default UserItem;
