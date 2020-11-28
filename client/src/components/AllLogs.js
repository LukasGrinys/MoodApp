import React, { Component } from 'react';
import { getLogs } from './../actions';
import { connect } from 'react-redux';

import Loading from './Loading/loading';
import LogItem from './../widgets/logItem';
import styles from './logs.module.css';
import BackButton from './../widgets/backButton';
import ButtonWid from './../widgets/Button';
import LoadingNetItem from './Loading/loadingNetItem';

class LogList extends Component {
    state = {
        skip: 3
    };
    UNSAFE_componentWillMount() {
        this.props.dispatch(getLogs(this.props.user.data.id, 0, 3));
    }
    loadMoreLogs = () => {
        if (this.props.user.data) {
            let skip = this.state.skip;
            this.props.dispatch(getLogs(this.props.user.data.id, skip, 3, this.props.logs.list));
            skip += 3;
            this.setState({
                skip: skip
            });
        }
    };
    returnLogs = (data) => {
        if (!data) return null;

        const list = data.data;
        
        if (list && Array.isArray(list) && list.length) {
            return list.map( (item, i) => {
                return (
                    <LogItem 
                        key={i} 
                        rating={item.rating} 
                        date={item.date} 
                        timing={item.timing} 
                        text={item.text}
                    />
                ) 
            })
        } else {
            return <LoadingNetItem/>
        }
    };
    returnLoadMoreButton = (list) => {
        if (list && list.length > 0) {
            const lastElement = list[list.length - 1];
            if (lastElement !== "No logs found") {
                return (
                    <ButtonWid background={'#3366FF'} color={'#FFFFFF'}>Load more</ButtonWid>
                )
            } else {
                return null
            }
        } else {
            return null;
        }
    }
    render() {
        return (
            <div>
                <BackButton/>
                <div className={styles.header}>All logs</div>
                <div className={styles.logs_wrapper}>
                    {this.returnLogs(this.props.logs.list)}
                </div>
                <div className={styles.bottom_panel}>
                    <div onClick={this.loadMoreLogs}>
                        {this.returnLoadMoreButton(this.props.logs.list)}
                    </div>
                </div>
            </div>
        );
    }
}

class AllLogs extends Component {
    render() {
        if (this.props.user.data) {
            return <LogList {...this.props}/>
        } else {
            return <Loading/>
        }
    }
}

function mapStateToProps(state) {
    return {
        logs: state.logs,
        user: state.user
    }
}
export default connect(mapStateToProps)(AllLogs);