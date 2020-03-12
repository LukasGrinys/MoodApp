import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLastLogs } from './../actions';
import styles from './dashboard.module.css';
import LoadingNetItem from './../widgets/loadingNetItem';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { returnWhite, dashboardButtonStyle } from './../widgets/nightmodeColors';

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
                    <Link to={`/logs/${item._id}`} style={returnWhite(props.nightmode)}>Read more</Link> 
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
            <div className={styles.flex_between}> 
                <div className={styles.net_itemHeader}>Last logs</div>
                {renderLogs(props.lastLogs.data)}
                <Link to="/logs"><div className={styles.button_logs} style={dashboardButtonStyle(props.nightmode)}>All Logs</div></Link>
            </div> 
            )  
        }
    } else {
        return <LoadingNetItem/>
    }
}

const MoodStatus = (props) => {
    const returnRating = (data) => {
        if (data !== "No logs found") {
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
        } else {
            return "N/A"
        }
    };
    const returnMessage = (rating) => {
        const parsedRating = parseInt(rating);
        if (props.lastLogs.data.length < 9) {
            return "";
        };
        if (parsedRating >= 7.5) {
            return "Great"
        };
        if (parsedRating < 7.5 && parsedRating >= 5) {
            return "Good"
        };
        if (parsedRating < 5 && parsedRating >= 3) {
            return "Average"
        };
        if (parsedRating < 3) {
            return "Bad"
        };
    }
    return (
        props.lastLogs ?
        <div className={styles.status_container}>
            <div className={styles.net_itemHeader}>
                Latest mood status
            </div>
            <div className={styles.status_box} style={dashboardButtonStyle(props.nightmode)}>
                {returnRating(props.lastLogs.data)}
            </div>
            <div className={styles.status_text}>
                {returnMessage(returnRating(props.lastLogs.data))}
            </div>
            <Link to="" style={{width: "100%"}}>
                <div className={styles.button_logs} style={dashboardButtonStyle(props.nightmode)}>
                    Stats
                </div> 
            </Link>
        </div>
        :
        <LoadingNetItem/>
    );
}

const SettingsItem = (props) => {
    return (
        <div>
            <div className={styles.net_header}>
                Settings
            </div>
            <div className={styles.flex_container}>
                <Link to="/settings" className={styles.flex_container}>
                    <div className={styles.settings_icon_wrapper}> 
                        <FontAwesome name="cog" className={styles.settings_icon} style={returnWhite(props.nightmode)}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}

const LogoutItem = (props) => {
    return (
        <div>
            <div className={styles.net_header}>
                Log out
            </div>
            <div className={styles.flex_container}>
                <Link to="/logout" className={styles.flex_container}>
                    <div className={styles.logout_icon_wrapper}> 
                        <FontAwesome name="sign-out" className={styles.settings_icon} style={returnWhite(props.nightmode)}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}



class DashboardNet extends Component {
    UNSAFE_componentWillMount() {
        this.props.dispatch(getLastLogs(this.props.user));
    }
    render() {
        return (
            <div className={styles.net}>
                <div className={styles.net_header}>
                    Your dashboard
                </div>
                <div className={styles.net_item}>
                    <LastLogsItem lastLogs={this.props.lastLogs} nightmode={this.props.nightmode}/>
                </div>
                <div className={styles.net_item}>
                    <MoodStatus lastLogs={this.props.lastLogs} nightmode={this.props.nightmode}/>
                </div>
                <div className={styles.net_item} nightmode={this.props.nightmode}>
                    <SettingsItem nightmode={this.props.nightmode}/>
                </div>
                <div className={styles.net_item}>
                    <LogoutItem nightmode={this.props.nightmode}/>
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