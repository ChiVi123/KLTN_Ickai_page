import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { keys, lists, titles } from '~/common';
import { Pagination, Table, Typography } from '~/components';
import { userSelector, usersAsync } from '~/redux';
import { logger } from '~/utils/logger';

import UserItem from './users/UserItem';

function Users() {
    const [searchParams] = useSearchParams();
    const {
        items: users,
        totalPage,
        isLoading,
    } = useSelector(userSelector.getUsers);
    const dispatch = useDispatch();

    const isLogger = false;
    const page = parseInt(searchParams.get(keys.page)) || 1;

    useEffect(() => {
        dispatch(usersAsync.getUsers({ page: page - 1 }));
    }, [dispatch, page]);

    if (isLogger) {
        logger({ groupName: Users.name, values: ['re-render'] });
    }

    return (
        <section className='section section--full-screen'>
            <Typography variant='h1'>{titles.users}</Typography>

            <Table heads={lists.tableUsers} loading={isLoading}>
                {users.map((item, index) => (
                    <UserItem
                        key={index}
                        user={item}
                        callback={() =>
                            dispatch(usersAsync.getUsers({ page: page - 1 }))
                        }
                    />
                ))}
            </Table>

            <Pagination current={page} total={totalPage} center />
        </section>
    );
}

export default Users;
