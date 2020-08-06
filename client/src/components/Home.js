import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

import { ReactComponent as LogoWhite} from './../hoc/logo_white.svg';
import { ReactComponent as LogoBlue} from './../hoc/logo_blue.svg';

import styles from './home.module.css';
import ButtonWid from './../widgets/Button';
import Loading from '../widgets/loading';

import { returnWhite } from './../widgets/nightmodeColors';
import { useTheme } from './../hoc/ThemeContext';

const Home = ({user, nightmode}) => {
    const darkTheme = useTheme();

    const renderGreeting = (isAuth) => {
        if (isAuth) {
            return (
                <div className={styles.textAlt}>
                    Hello <span style={{color:"#3366ff"}}> {user.data.firstName} </span>  
                </div>
            )
        }
        return ( <div className={styles.textAlt}>Your daily mood tracker</div>)
    }
    const renderButtons = (isAuth) => {
        if (isAuth) {
            return (
                <div className={styles.buttons}>
                    <Link to="/dashboard">
                        <ButtonWid nightmode={darkTheme} color={"#fffff2"} background={"#3366ff"}>
                            Dashboard
                        </ButtonWid>
                    </Link>
                    <Link to="/logout">
                        <ButtonWid nightmode={darkTheme} color={"#3366ff"} background={"#fff2f2"}>
                            Log Out
                        </ButtonWid>
                    </Link>
                </div>
            )
        }
        return (
            <div className={styles.buttons}>
                <Link to="/login">
                    <ButtonWid nightmode={darkTheme} color={"#fffff2"} background={"#3366ff"}>
                        Log In
                    </ButtonWid>
                </Link>
                <Link to="/register">
                    <ButtonWid nightmode={darkTheme} color={"#3366ff"} background={"#fff2f2"}>
                        Register
                    </ButtonWid>
                </Link>
            </div>
        )
    }

    if (user.data) {
        return  (
        <div className={styles.wrapper} >
            <ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
                <div className={styles.bigLogo_container} style={returnWhite(darkTheme)}>
                    { darkTheme === true ? <LogoWhite className={styles.bigLogo}/> : <LogoBlue className={styles.bigLogo}/> }
                </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInDown" delay={1000} offset={75} animateOnce={true}>
               {renderGreeting(user.data.isAuth)}
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInDown" delay={2000} offset={75} animateOnce={true}>
                {renderButtons(user.data.isAuth)}
            </ScrollAnimation> 
        </div>)
    } else {
        return ( <Loading nightmode={darkTheme}/>)
    }

};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Home);