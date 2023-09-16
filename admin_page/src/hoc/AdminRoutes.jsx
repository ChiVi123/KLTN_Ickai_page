import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { userActions, userSelector } from '~/redux';
import { directions } from '~/utils';

function AdminRoutes() {
    const user = useSelector(userSelector.getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isExpired(user.accessToken)) {
            dispatch(userActions.resetUser());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isExpired(user.accessToken)) {
        return <Navigate to={directions.loginAdmin} />;
    } else {
        return user.role === 'role_admin' ? (
            <Outlet />
        ) : (
            <Navigate to={directions.loginAdmin} />
        );
    }
}

export default AdminRoutes;
