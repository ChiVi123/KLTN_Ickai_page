import { googleLogout } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { directions } from '~/common';
import { cartActions, userActions } from '~/redux';

export const useGenerateRandomColor = () => {
    const [color, setColor] = useState('');
    const generateColor = () => {
        setColor(Math.random().toString(16).substring(-6));
    };
    return { color, generateColor };
};

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return () => {
        googleLogout();
        dispatch(userActions.resetUser());
        dispatch(cartActions.resetCart());
        navigate(directions.signIn);
    };
};
