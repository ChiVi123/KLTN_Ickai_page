import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { useLogoutNoDirect } from '~/hooks';
import { userSelector } from '~/redux';

function PublicRoutes() {
    const logout = useLogoutNoDirect();
    const { accessToken } = useSelector(userSelector.selectInfo);

    useEffect(() => {
        if (accessToken && isExpired(accessToken)) {
            logout();
        }
        return () => {};
    }, [accessToken, logout]);

    return <Outlet />;
}

export default PublicRoutes;
