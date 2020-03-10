import React, { Component } from 'react';
import { viewLog, clearLog } from './../actions';
import { connect } from 'react-redux';
import Loading from './../widgets/loading';
import styles from './logview.module.css';
import FontAwesome from 'react-fontawesome';
import BackButton from './../widgets/backButton';

class LogView extends Component {
    componentWillMount() {
        this.props.dispatch(viewLog(this.props.match.params.id))
    }
    componentWillUnmount() {
        this.props.dispatch(clearLog())
    }
    render() {
        if (this.props.logs) {
            if (this.props.logs.logInfo) {
                const log = this.props.logs.logInfo.log
                if (log) {
                    return (
                        <div>
                            <div className={styles.top_panel}>
                            <BackButton nightmode={this.props.nightmode}/>
                            </div>
                            <div className={styles.logWrapper}>
                                <div className={styles.top_line}>
                                    <div className={styles.rating_box}>
                                        {log.rating}
                                    </div>
                                    <div>
                                        <FontAwesome name="hourglass" className={styles.icon}/>
                                        {log.timing}
                                    </div>
                                    <div className={styles.date}>
                                        <FontAwesome name="calendar" className={styles.icon}/>
                                        {log.date}
                                    </div>
                                </div>
                                <div className={styles.text}>
                                    {log.text}
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return <Loading nightmode={this.props.nightmode}/>
                }
                
            } else {
                return <Loading nightmode={this.props.nightmode}/>
            }     
        } else {
            return <Loading/>
        } 
    }
}

function mapStateToProps(state) {
    return {
        logs: state.logs
    }
}

export default connect(mapStateToProps)(LogView);