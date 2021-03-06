import React, { useEffect } from 'react';
import Loading from '../Loading/loading';
import { logOut } from '../../actions/user/asyncActions';
import { useDispatch } from 'react-redux';

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(logOut());
    // eslint-disable-next-line
    }, [])

    return <Loading/>
};

export default LogOut;