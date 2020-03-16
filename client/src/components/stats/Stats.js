import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getAllLogs } from './../../actions';

// Widgets
import Loading from './../../widgets/loading';
import BackButton from './../../widgets/backButton';
import GraphCanvas from './GraphCanvas';
import DaytimeGraph from './DaytimeGraph';
import styles from './stats.module.css';
// Functions
import { countAverage, lastSevenDaysAverage, listToArray, returnDaytimeStats} from './statsFunctions';
import { ratingButtonStyle } from './../../widgets/nightmodeColors';

class Stats extends Component {
    state = {
        dataReceived: false
    }
    UNSAFE_componentWillReceiveProps(nextprops){
        if (nextprops.user.data && this.state.dataReceived === false) {
            this.props.dispatch(getAllLogs(nextprops.user.data.id));
            this.setState({
                dataReceived: true
            })
        }
    }
    render() {
        if (this.props.user.data && this.props.logs.list) {
            if (this.props.logs.list.length > 0) {
                const sevenDayAverageObject = lastSevenDaysAverage(this.props.logs.list);
                const listToArrayObject = listToArray(this.props.logs.list);
                const daytimeAverageObject = returnDaytimeStats(this.props.logs.list);
                let nightmode = this.props.nightmode;
                return (
                    <div className={styles.container}>
                        <BackButton nightmode={nightmode}/>
                        <h1>User stats</h1>
                        <div className={styles.first_block}>
                            <div className={styles.average_block}>
                                <b>Your average mood:</b>
                                <div className={styles.average_box} style={ratingButtonStyle(nightmode)}>{countAverage(this.props.logs.list)}</div>
                                <div className={styles.small_text_box}>Retrieved from the last 100 logs</div>
                            </div>
                            <div className={styles.average_block}>
                                <b>7 day mood:</b>
                                <div className={styles.average_box} style={ratingButtonStyle(nightmode)}>{sevenDayAverageObject.average}</div>
                                <div className={styles.small_text_box}>Counted from the last 7 active days from <br/>
                                {sevenDayAverageObject.firstDay} to {sevenDayAverageObject.lastDay}</div>
                            </div>
                        </div>
                        <div className={styles.graph_container}>
                            <b>Your mood graph</b>
                            <GraphCanvas list={listToArrayObject.arr} nightmode={nightmode}/>
                            <div> From {listToArrayObject.firstDay} to {listToArrayObject.lastDay}</div>
                        </div>
                        <div className={styles.daytime_container}>
                            <b>Your mood throughout the day:</b><br/>
                            <DaytimeGraph obj={daytimeAverageObject} nightmode={nightmode}/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        No logs to be found for the statistics
                    </div>
                )
            }
        } else {
            return <Loading nightmode={this.props.nightmode}/>
        }
        
    }
};

function mapStateToProps(state){
    return {
        user: state.user,
        logs: state.logs
    }
}
export default connect(mapStateToProps)(Stats);