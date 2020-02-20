import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

import styles from './home.module.css';
import ButtonWid from './../widgets/Button';
import Loading from '../widgets/loading';

const DefaultHome = () => {
    return (
        <div className={styles.wrapper} >
            <ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
                <div className={styles.bigLogo}>
                    MoodApp
                </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInDown" delay={1000} offset={75} animateOnce={true}>
                <div className={styles.text}>
                    Your daily mood tracker
                </div>
            </ScrollAnimation>
            
            <ScrollAnimation animateIn="fadeInDown" delay={2000} offset={75} animateOnce={true}>
                <div className={styles.buttons}>
                    <Link to="/login">
                        <ButtonWid color={"#3366ff"} background={"#fff2f2"}>
                            Log In
                        </ButtonWid>
                    </Link>
                    <Link to="/register">
                        <ButtonWid color={"#fffff2"} background={"#3366ff"}>
                            Sign Up
                        </ButtonWid>
                    </Link>
                </div>
            </ScrollAnimation> 
        </div>
    )
}

const UserHome = (props) => {
    return (
        <div className={styles.wrapper} >
            <ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
                <div className={styles.bigLogo}>
                    MoodApp
                </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInDown" delay={1000} offset={75} animateOnce={true}>
                <div className={styles.textAlt}>
                    Hello <span style={{color:"#3366ff"}}>{props.name}</span>
                </div>
            </ScrollAnimation>
            
            <ScrollAnimation animateIn="fadeInDown" delay={2000} offset={75} animateOnce={true}>
                <div className={styles.buttons}>
                    <Link to="/dashboard">
                        <ButtonWid color={"#fffff2"} background={"#3366ff"}>
                            Your Dashboard
                        </ButtonWid>
                    </Link>
                    <Link to="/logout">
                        <ButtonWid color={"#3366ff"} background={"#fff2f2"}>
                            Log Out
                        </ButtonWid>
                    </Link>
                </div>
            </ScrollAnimation> 
        </div>
    )
}


const Home = ({user, nightmode}) => {
    if (user.data) {
        if (user.data.isAuth) {
            return (<UserHome name={user.data.firstName} nightmode={nightmode}/>)
        }
        if (!user.data.isAuth) {
            return (<DefaultHome nightmode={nightmode}/>)
        }
    } else {
        return ( <Loading nightmode={nightmode}/>)
    }
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Home);