import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import classNames from 'classnames';
import styles from './Home.module.scss';
import Button from '../Button/Button';
import Loading from '../Loading/loading';
import { useTheme } from '../../contexts/ThemeContext';

const Home = ({isAuth, firstName}) => {    
    const darkTheme = useTheme();

    if (isAuth === undefined) {
        return <Loading/>
    }

    return  (
    <div className={styles.wrapper}>
        <ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
            <div className={classNames(styles.bigLogo, darkTheme && styles.dark)}>
                MoodApp
            </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInDown" delay={1000} offset={75} animateOnce={true}>
            {   isAuth ? (
                    <div className={styles.text}>
                        Hello <span>{firstName}</span>  
                    </div>
                ) : ( <div className={styles.text}>Your daily mood tracker</div> )
            }
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInDown" delay={2000} offset={75} animateOnce={true}>
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
        </ScrollAnimation> 
    </div>)
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