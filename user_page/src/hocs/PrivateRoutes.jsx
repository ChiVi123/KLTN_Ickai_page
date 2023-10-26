import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { directions } from '~/common';
import { useLogoutNoDirect } from '~/hooks';
import { userSelector } from '~/redux';

function PrivateRoutes() {
    const logout = useLogoutNoDirect();
    const user = useSelector(userSelector.selectInfo);

    useEffect(() => {
        if (isExpired(user.accessToken)) {
            logout();
        }
        return () => {};
    }, [logout, user.accessToken]);

    return user?.id ? <Outlet /> : <Navigate to={directions.signIn} />;
}

export default PrivateRoutes;
