import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux';
import { canUserLog } from '../../actions';
import styles from './AddNewLog.module.scss';
import LoadingNetItem from '../Loading/loadingNetItem';
import { Link } from 'react-router-dom';
import { getDate, getDaytime } from '../../util/dateHelpers';
import { daytimes } from '../../constants/daytimes';
import { routerRoutes } from '../../constants/routerRoutes';
import classNames from 'classnames';

class AddNewLog extends Component {
    componentWillMount() {
        const date = getDate();
        const timing = getDaytime();
        this.props.dispatch(canUserLog(date, timing, this.props.userId))
    };

    returnTimeRemaining() {
        let currentTiming = getDaytime();
        let timeOfNextLog = 0;
        
        switch(currentTiming) {
            case daytimes.morning:
                timeOfNextLog = 13;
                break;
            case daytimes.afternoon :
                timeOfNextLog = 20;
                break;
            case daytimes.evening :
                timeOfNextLog = 7;
                break;
            default:
                timeOfNextLog = 7;
        };

        return `${timeOfNextLog}:00`
    }

    render(){
        const { canLog, darkTheme } = this.props;

        if (canLog === undefined) {
            return <LoadingNetItem/>
        } 

        if (canLog && getDaytime() !== daytimes.night) {
            return (
                <Link to={routerRoutes.addNewLog}>
                    <div className={classNames(
                        styles.logbutton, 
                        styles.available,
                        darkTheme && styles.dark
                        )}>
                        <div className={styles.attentionBorder}/>
                        <FontAwesome name="fas fa-plus" className={styles.floating}/> ADD LOG
                    </div>
                </Link> 
            )
        }

        return (
            <div className={classNames(styles.logbutton, styles.unavailable)}>
                Next log will be available at: {this.returnTimeRemaining()}
            </div>
        )
    }
};

function mapStateToProps({logs, user}) {
    const { id : userId } = user;
    const { canLog } = logs; 

    return { canLog, userId }
}

export default connect(mapStateToProps)(AddNewLog);