import React, { Fragment } from 'react';
import { Wrapper, Heading, Label, Input, Footer } from '../Forms/Forms';
import Button from '../Button';
import BackButton from '../Back';
import Loading from '../Loading/loading';
import ErrorBox from '../ErrorBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styles from './AddLogPage.module.scss';
import { useAddLog } from '../../hooks/AddLog/useAddLog';

const AddLogPage = () => {
    const {
        returnMoodText,
        postLogError,
        canLog,
        message,
        moodRating,
        isPostingLog,
        handleRangeInput,
        handleMessageInput,
        handleAddLog
    } = useAddLog();

    if (canLog === undefined) {
        return <Loading/>
    }

    if (canLog) {
        return (
            <Fragment>
                <Wrapper>
                    <Heading>Add log</Heading>
                    <span>How do you feel at the moment? Rate your mood:</span>
                    <div className={styles.topSection}>
                        <div className={styles.moodBox}>
                            {moodRating}
                        </div>
                        <div className={styles.inputLine}>
                            <FontAwesomeIcon
                                className={styles.thumb} 
                                icon={faThumbsDown}
                                style={{color: "#800000"}}
                            />
                            <input 
                                onChange={handleRangeInput} 
                                type="range" 
                                min="1" 
                                max="10" 
                                value={moodRating}
                            />
                            <FontAwesomeIcon
                                className={styles.thumb} 
                                icon={faThumbsUp}
                                style={{color: "#16774f"}}
                            />
                        </div>
                        <span>{returnMoodText(moodRating)}</span>
                    </div>
                    <Label>Describe your thoughts: (optional)</Label>
                    <Input 
                        type={'textarea'}
                        name={'message'}
                        value={message}
                        controlEvents={{
                            handleChange : handleMessageInput
                        }}
                    />
                    <Footer>
                        <Button
                            handleClick={handleAddLog}
                            disabled={isPostingLog}
                        >
                            Submit
                        </Button>
                    </Footer>
                    {postLogError && (
                            <ErrorBox>
                                {postLogError}
                            </ErrorBox>
                        )}
                </Wrapper>
                <BackButton/>
            </Fragment>
        );
    }

    return null;
};

export default AddLogPage;