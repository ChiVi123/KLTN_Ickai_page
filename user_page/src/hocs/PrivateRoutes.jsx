import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { directions } from '~/common';
import { userSelector } from '~/redux';

function PrivateRoutes() {
    const userId = useSelector(userSelector.selectId);

    return userId ? <Outlet /> : <Navigate to={directions.signIn} />;
}

export default PrivateRoutes;
