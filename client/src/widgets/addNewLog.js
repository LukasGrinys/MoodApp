import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux';
import { canUserLog } from './../actions';
import styles from './newLog.module.css';
import LoadingNetItem from './loadingNetItem';
import { Link } from 'react-router-dom';
import { returnDarkBackground } from './nightmodeColors';

class AddNewLog extends Component {
    state = {
        timeRemaining : 0
    }
    returnDate = () => {
        const date = new Date();
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;  
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let fullDate = [date.getFullYear(), month, day].join('-');
        return fullDate;
    }
    returnDaytime = () => {
        const date = new Date();
        let hour = date.getHours();
        let daytime = ''
        if (hour >= 7 && hour <= 12) {
            daytime = 'Morning'
        };
        if (hour > 12 && hour <= 19) {
            daytime = 'Afternoon'
        };
        if (hour > 19 && hour <= 23) {
            daytime = 'Evening'
        };
        if (hour < 7) {
            daytime = 'Night'
        }
        return daytime
    };
    UNSAFE_componentWillMount() {
        let date = this.returnDate();
        let timing = this.returnDaytime();
        this.props.dispatch(canUserLog(date, timing, this.props.userId))
    };
    returnTimeRemaining() {
        let currentTiming = this.returnDaytime();
        let timeOfNextLog = 0;
        switch(currentTiming) {
            case 'Morning':
                timeOfNextLog = 13;
                break;
            case 'Afternoon' :
                timeOfNextLog = 20;
                break;
            case 'Evening' :
                timeOfNextLog = 7;
                break;
            default:
                timeOfNextLog = 7;
        };
        return `${timeOfNextLog}:00`
    }
    renderButton = (canLog) => {
        if (canLog && this.returnDaytime() !== 'night') {
            return (
                <Link to="/addlog">
                    <div className={[styles.logbutton, styles.available].join(' ')} style={returnDarkBackground(this.props.nightmode)}>
                        <div className={styles.attentionBorder}></div>
                        <FontAwesome name="fas fa-plus" className={styles.floating}/> ADD LOG
                    </div>
                </Link> 
            )
        } else {
            return (
                <div className={[styles.logbutton, styles.unavailable].join(' ')}>
                    Next log will be available at: {this.returnTimeRemaining()}
                </div>
            )
        }
    }
    render(){
        if (this.props.canLog) {
            return (
                <div>
                    {this.renderButton(this.props.canLog.canLog)}
                </div>
            )
        } else {
            return (
                <div>
                    <LoadingNetItem/>
                </div>
            )
        }
        
    }
};

function mapStateToProps(state) {
    return { 
        canLog: state.logs.data
    }
}

export default connect(mapStateToProps)(AddNewLog);