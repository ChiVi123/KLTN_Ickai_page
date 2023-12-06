import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { enums, keys, lists, titles } from '~/common';
import {
    Col,
    Pagination,
    Row,
    SearchList,
    Table,
    Tabs,
    Typography,
} from '~/components';
import { userSelector, usersAsync } from '~/redux';
import { logger } from '~/utils/logger';

import { userServices } from '~/services';
import UserItem from './users/UserItem';

function Users() {
    const [tabs, setTabs] = useState([]);
    const [searchParams] = useSearchParams();
    const {
        items: users,
        totalPage,
        isLoading,
    } = useSelector(userSelector.selectList);
    const dispatch = useDispatch();

    const isLogger = false;
    const page = parseInt(searchParams.get(keys.page)) || 1;
    const query = searchParams.get(keys.query) || '';
    const userState = searchParams.get(keys.state) || '';

    useEffect(() => {
        dispatch(
            usersAsync.search({ query, state: userState, page: page - 1 }),
        );
    }, [dispatch, page, query, userState]);
    useEffect(() => {
        (async () => {
            const result = await userServices.countState();
            setTabs(
                result.map((item) => ({
                    ...item,
                    content: enums.contentUserStates[item.state],
                })),
            );
        })();
    }, []);

    if (isLogger) {
        logger({ groupName: Users.name, values: [users] });
    }

    return (
        <section className='section section--full-screen'>
            <Typography variant='h2'>{titles.users}</Typography>

            <Row gx={0}>
                <Col baseCols={8}>
                    <Tabs tabs={tabs} />
                </Col>
                <Col baseCols={6}>
                    <SearchList placeholder='Tìm kiếm tên, số điện thoại...' />
                </Col>
            </Row>

            <Table heads={lists.tableUsers} loading={isLoading}>
                {users
                    ? users.map((item, index) => (
                          <UserItem
                              key={index}
                              user={item}
                              callback={() =>
                                  dispatch(
                                      usersAsync.getUsers({ page: page - 1 }),
                                  )
                              }
                          />
                      ))
                    : []}
            </Table>

            <Pagination current={page} total={totalPage} center />
        </section>
    );
}

export default Users;
