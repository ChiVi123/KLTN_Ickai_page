import { googleLogout } from '@react-oauth/google';
import { useState } from 'react';
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
export const useLogoutNoDirect = () => {
    const dispatch = useDispatch();

    return () => {
        googleLogout();
        dispatch(userActions.reset());
        dispatch(cartActions.reset());
    };
};
export const useModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleOpenModal = () => setIsOpenModal(true);
    const handleCloseModal = () => setIsOpenModal(false);

    return { isOpenModal, handleCloseModal, handleOpenModal };
};
