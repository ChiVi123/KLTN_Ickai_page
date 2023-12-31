import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { contextPage, keys, notifies, titles } from '~/common';
import { contentUserStates } from '~/common/enums';
import { ButtonIcon } from '~/components';
import { usersAsync } from '~/redux';
import { userServices } from '~/services';

function UserItem({ user }) {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const page = parseInt(searchParams.get(keys.page)) || 1;
    const query = searchParams.get(keys.query) || '';
    const userState = searchParams.get(keys.state) || '';

    const isActive = user.state === 'active';
    let isDisplay = true;

    if (user.role === 'role_admin') {
        isDisplay = false;
    }

    if (user.state === 'not_verify') {
        isDisplay = false;
    }

    const handleIsActivate = async ({ id, state }) => {
        Swal.fire({
            title: titles.confirmChange,
            confirmButtonText: contextPage.yes,
            showCancelButton: true,
            cancelButtonText: contextPage.no,
            width: 'auto',
        }).then(async (result) => {
            if (result.isConfirmed) {
                switch (state) {
                    case 'active':
                        const resultBlock = await userServices.blockUserById(
                            id,
                        );
                        const messageBlockSuccess = 'Delete user success';

                        if (resultBlock?.message === messageBlockSuccess) {
                            toast.success(notifies.blockUserSuccess);
                        } else {
                            toast.error(notifies.blockUserFail);
                        }
                        break;
                    case 'block':
                        const resultActive = await userServices.unblockUserById(
                            id,
                        );
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

                dispatch(
                    usersAsync.search({
                        query,
                        state: userState,
                        page: page - 1,
                    }),
                );
                dispatch(usersAsync.count());
            }
        });
    };

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.role.split('_')[1]}</td>
            <td>{contentUserStates[user.state]}</td>
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
