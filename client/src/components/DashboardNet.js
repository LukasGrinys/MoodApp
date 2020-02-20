import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLastLogs } from './../actions';
import styles from './dashboard.module.css';
import LoadingNetItem from './../widgets/loadingNetItem';
import { Link } from 'react-router-dom';

const LastLogsItem = (props) => {
    const renderLogs = (data) => {
        const lastThreeLogs = data.slice(0,3);
        return lastThreeLogs.map( (item, i) => (
            <div key={i} className={styles.log_wrapper}>
                <div className={styles.log_content}>
                    <div className={styles.rating_box}>{item.rating}</div>
                    <div className={styles.right_box}>
                        <div className={styles.log_date}>{item.date}</div>
                        <div className={styles.log_text}>{item.text}</div>
                    </div>
                </div>
                <div className={styles.read_log}>
                    <Link to={`/logs/${item._id}`} >Read more</Link> 
                </div>
            </div>
        ))
    }
    if (props.lastLogs) {
        if (props.lastLogs.data === "No logs found") {
            return (
                <div className={styles.grey_text}>
                    There are no logs at the moment <br/><br/>
                    Write Your first one, by pressing the green button at the top
                </div>
            ) 
        } else {
            return ( 
            <div> 
                <div className={styles.net_itemHeader}>Last logs</div>
                {renderLogs(props.lastLogs.data)}
                <div className={styles.button_logs}>
                    <Link to="/logs">All Logs</Link>
                </div>
            </div> 
            )  
        }
    } else {
        return <LoadingNetItem/>
    }
}

const MoodStatus = (props) => {
    const returnRating = (data) => {
        let total = 0;
        let quantity = 0;
        data.map( (item) => {
            total += parseInt(item.rating);
            quantity++;
            return null;
        });
        const average = Math.round((total / quantity) * 10) / 10;
        if (Number.isInteger(average)) {
            return `${average}.0`
        }
        return average;
    };
    const returnMessage = (rating) => {
        const parsedRating = parseInt(rating);
        // if (props.lastLogs.data.length < 6) {
        //     return "";
        // };
        if (parsedRating >= 7.5) {
            return "It seems that you've been doing allright, don't let that change!"
        };
        if (parsedRating < 7.5 && parsedRating >= 5) {
            return "Your mood has been average lately. If theres something on your mind, check our insights below"
        };
        if (parsedRating < 5 && parsedRating >= 3) {
            return "Your mood has been quite down. Check our insights or get psychological help. You can find solutions on the sections below."
        };
        if (parsedRating < 3) {
            return "We strongly recommend you to reach out for psychological help. You can find solutions on the sections below."
        };
    }
    return (
        props.lastLogs ?
        <div className={styles.status_container}>
            <div className={styles.net_itemHeader}>
                Latest mood status
            </div>
            <div className={styles.status_box}>
                {returnRating(props.lastLogs.data)}
            </div>
            <div className={styles.status_text}>
                {returnMessage(returnRating(props.lastLogs.data))}
            </div>
            <div className={styles.button_logs}>
                    <Link to="/stats">Stats</Link>
            </div>  
        </div>
        :
        <LoadingNetItem/>
    );
}

class DashboardNet extends Component {
    UNSAFE_componentWillMount() {
        this.props.dispatch(getLastLogs(this.props.user));
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     console.log(nextProps)
    // }
    render() {
        return (
            <div className={styles.net}>
                <div className={styles.net_header}>
                    Your dashboard
                </div>
                <div className={styles.net_item}>
                    <LastLogsItem lastLogs={this.props.lastLogs}/>
                </div>
                <div className={styles.net_item}>
                    <MoodStatus lastLogs={this.props.lastLogs}/>
                </div>
                <div className={styles.net_item}>
                    
                </div>
                <div className={styles.net_item}>
                    This is net item
                </div>
            </div>
        )
    }  
}

function mapStateToProps(state) {
    return {
        lastLogs: state.logs.lastLogs,
        lastNineLogs: state.logs.lastNineLogs
    }
}
export default connect(mapStateToProps)(DashboardNet);