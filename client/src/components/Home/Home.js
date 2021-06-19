import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import Button from '../Button';
import Loading from '../Loading/loading';
import Logo from '../Logo';
import { useTheme } from '../../contexts/ThemeContext';

const Home = ({isAuth, firstName}) => {    
    const darkTheme = useTheme();
    const isAuthenticating = isAuth === undefined;

    return  (
        <div className={styles.wrapper}>
            <Logo showWhite={darkTheme} className={styles.bigLogo}/>
                {
                    isAuthenticating ? (
                        <Loading/>
                    ) : (
                            <Fragment>
                                {isAuth ? (
                                    <div className={styles.text}>
                                        Hello <span>{firstName}</span>  
                                    </div>
                                    ) : (
                                    <div className={styles.text}>
                                        Your daily mood tracker
                                    </div>
                                )}
                                <div className={styles.buttonWrapper}>
                                    {
                                        isAuth ? (
                                            <Fragment>
                                                <Link to="/dashboard">
                                                    <Button color={'primary'}>
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                                <Link to="/logout">
                                                    <Button color={'white'}>
                                                        Log out
                                                    </Button>
                                                </Link>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <Link to="/login">
                                                    <Button color={'primary'}>Log in</Button>
                                                </Link>
                                                <Link to="/register">
                                                    <Button color={'white'}>Register</Button>
                                                </Link>
                                            </Fragment>
                                        )
                                    }
                                </div>
                            </Fragment>
                    )
                }
        </div>
    )
};

const mapStateToProps = ({user}) => {
    const { isAuth, userData } = user;
    const firstName = userData ? userData.firstName : '';

    return {
        isAuth,
        firstName
    }
}
export default connect(mapStateToProps)(Home);