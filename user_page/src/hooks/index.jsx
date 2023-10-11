import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { directions } from '~/common';
import { cartActions, userActions } from '~/redux';

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return () => {
        googleLogout();
        dispatch(userActions.reset());
        dispatch(cartActions.reset());
        navigate(directions.signIn);
    };
};
