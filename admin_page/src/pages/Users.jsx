import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { keys, lists, titles } from '~/common';
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
import UserItem from './users/UserItem';

function Users() {
    const [searchParams] = useSearchParams();
    const {
        items: users,
        totalPage,
        isLoading,
    } = useSelector(userSelector.selectList);
    const { items: tabs } = useSelector(userSelector.selectCount);
    const dispatch = useDispatch();

    const page = parseInt(searchParams.get(keys.page)) || 1;
    const query = searchParams.get(keys.query) || '';
    const userState = searchParams.get(keys.state) || '';

    useEffect(() => {
        dispatch(
            usersAsync.search({ query, state: userState, page: page - 1 }),
        );
    }, [dispatch, page, query, userState]);
    useEffect(() => {
        dispatch(usersAsync.count());
    }, [dispatch]);

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
                          <UserItem key={index} user={item} />
                      ))
                    : []}
            </Table>

            <Pagination current={page} total={totalPage} center />
        </section>
    );
}

export default Users;
