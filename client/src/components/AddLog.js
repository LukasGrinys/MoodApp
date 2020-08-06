import React, { Component } from 'react';
import FormWrapper from './../widgets/FormWrapper';
import { connect } from 'react-redux';
import { canUserLog, postLog, clearPostLog, userCannotLog, clearLastLogs } from './../actions';
import Loading from './../widgets/loading';
import styles from './addlog.module.css';
import ButtonWid from './../widgets/Button';
import FontAwesome from 'react-fontawesome';
import BackButton from './../widgets/backButton';
import MoodBox from './../widgets/moodBox';

class AddLog extends Component {
    state = {
        dataReceived: false,
        mood: 0,
        text: '',
        moodText: '',
        error: false,
        errorMessage: '',
        logPosted: false,
        disabled: false
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
    handleMoodText = (mood) => {
        let moodText = '';
        if (mood >= 9) { moodText = "Awesome!" }
        else if (mood >= 7) { moodText = "Good" }
        else if (mood >= 5) { moodText = "Average" }
        else if (mood >= 3) { moodText = "Not well" }
        else if (mood < 3) { moodText = "Bad"}
        this.setState({
            moodText: moodText
        })
    }
    handleMoodInput = (event) => {
        let moodRating = event.target.value;
        this.setState({
            mood: moodRating,
            error: false,
            errorMessage: ''
        });
        this.handleMoodText(moodRating);
    }
    handleTextInput = (event) => {
        let text= event.target.value;
        this.setState({
            text: text
        })
    }
    UNSAFE_componentWillReceiveProps(nextprops) {
        if (nextprops.user.data.id && !this.state.dataReceived) {
            let timing = this.returnDaytime();
            let date = this.returnDate();
            this.props.dispatch(canUserLog(date, timing, nextprops.user.data.id));
            this.setState({dataReceived: true});
        }
        if (nextprops.user.data && !nextprops.logs.data) {
            this.props.history.push("/dashboard");
        }
        if (nextprops.logs.logPosted) {
            if (nextprops.logs.logPosted.success) {
                this.setState({
                    error: false,
                    errorMessage: "Log was successfully posted. You will be redirected soon..",
                    logPosted: true
                });
                setTimeout( () => {
                    this.props.dispatch(userCannotLog());
                    this.props.history.push("/dashboard");
                }, 3000)
            } else {
                this.setState({
                    error: true,
                    errorMessage: "Something went wrong, try again later",
                    disabled: false,
                    logPosted: false
                })
            }
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clearPostLog());
        this.props.dispatch(clearLastLogs());
    }
    handleFormData = () => {
        if (this.state.mood === 0) {
            this.setState({
                error: true,
                errorMessage: "You must rate your mood"
            })
        } else {
            let timing = this.returnDaytime();
            if (timing === "Night") {
                this.setState({
                    error: true,
                    errorMessage: "Can't post new logs right now. Next log will be available on 7:00"
                })
            } else {
                if (!this.state.logPosted && !this.state.disabled) {
                    this.setState({
                        disabled: true
                    });
                    this.props.dispatch(postLog(this.props.user.data.id, this.returnDate(), timing, this.state.mood, this.state.text));
                }
            }
        }
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleFormData();
        }
    }

    renderErrorMessage = () => {
        if (this.state.error) {
            return <span style={{color:"#800000"}}>{this.state.errorMessage}</span>
        } else if (this.state.logPosted) {
            return <span style={{color:"#16774f"}}>{this.state.errorMessage}</span>
        } else {
            return null
        }
    }
    render() {
        if (this.props.logs.data && this.props.user) {
            if (this.props.logs.data.canLog === true) {
                return (
                    <FormWrapper>
                        <h1>Add a Log</h1>
                        <label htmlFor="mood">How do you feel at the moment? Rate your mood:</label><br/>
                        <div className={styles.center}>
                            <MoodBox>
                                {this.state.mood}
                            </MoodBox><br/>
                            <div className={styles.inputLine}>
                                <FontAwesome className={styles.thumb} name="thumbs-down" style={{color: "#800000"}}/>
                                <input onChange={this.handleMoodInput} type="range" id="mood" name="mood" min="1" max="10" value={this.state.mood}/>
                                <FontAwesome className={styles.thumb} name="thumbs-up" style={{color: "#16774f"}}/>
                            </div><br/>
                            <div>
                                {this.state.moodText}
                            </div>
                        </div><br/>
                        <label htmlFor="logtext">Describe your thoughts: (optional)</label><br/>
                        <textarea id="logtext" name="logtext" onKeyUp={this.handleKeyUp} onChange={this.handleTextInput} value={this.state.text} placeholder="What made your day better? Was there any specific situations or thoughts that changed your mood? If you don't want to write anything, leave this field empty."></textarea><br/>
                        <div className={styles.inputLine}>
                            {this.renderErrorMessage()}
                        </div>
                        <div className={styles.inputLine}>
                            <div onClick={this.handleFormData}>
                                <ButtonWid color="#FFFFFF" background="#3366FF" disabled={this.state.disabled} nightmode={this.props.nightmode}>Submit</ButtonWid>
                            </div>
                        </div>  
                        <BackButton nightmode={this.props.nightmode}/>  
                    </FormWrapper>
                );
            } else {
                return <Loading nightmode={this.props.nightmode}/>
            }
        } else {
            return <Loading nightmode={this.props.nightmode}/>
        }
        
    }
}

function mapStateToProps(state) {
    return {
        logs: state.logs
    }
}

export default connect(mapStateToProps)(AddLog);