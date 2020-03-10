import React from 'react';
import axios from 'axios';
import Loading from './../widgets/loading';

const LogOut = (props) => {
    axios.get('/api/logout')
    .then( setTimeout( () => {
        props.history.push('/');
    }, 1000) );
    return (
        <div>
            <Loading nightmode={props.nightmode}/>
        </div>
    );
};

export default LogOut;