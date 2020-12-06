import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../Back/BackButton';
import { Wrapper, Heading, Footer } from '../Forms/Forms';
import AccountDetails from './AccountDetails';
import ChangePassword from './ChangePassword';
import Button from '../Button/Button';
import Loading from '../Loading/loading';
import styles from './Settings.module.scss';
import { useSelector } from 'react-redux';
import { routerRoutes } from '../../constants/routerRoutes';

const Settings = () => {
    const user = useSelector( ({user}) => {
        if (user && user.userData) {
            return user.userData
        };

        return {}
    });

    const { 
        email, 
        firstName, 
        lastName 
    } = user;

    if (!user || !Object.keys(user).length) {
        return <Loading/>
    }

    return (
        <div>
            <BackButton/>
            <Heading>Account settings</Heading>
            <AccountDetails
                email={email}
                firstName={firstName}
                lastName={lastName}
            /><br/>
            <ChangePassword/><br/>
            <Wrapper>
                <h3 className={styles.miniHeader}>Delete account</h3>
                <Footer>
                    <Link to={routerRoutes.delete}>
                        <Button>Delete account</Button>
                    </Link>
                </Footer>
            </Wrapper>
        </div>
    )
}

export default Settings;