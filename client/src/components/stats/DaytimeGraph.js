import React from 'react';
import styles from './DaytimeGraph.module.scss';
import { mapLogsToDaytimeStats } from '../../util/statsHelpers';
import morningIcon from './icons/morning.svg';
import afternoonIcon from './icons/afternoon.svg';
import eveningIcon from './icons/evening.svg';
import classNames from 'classnames';
import { useTheme } from './../../contexts/ThemeContext';

const returnBullet = (rating, left, darkTheme) => {
    if (rating === "N/A") {
        return null;
    }

    return (
        <div 
            className={classNames(
                styles.daytime_bullet,
                darkTheme && styles.dark
            )} 
            style={{bottom:`${rating * 30 -10}px`, left:`${left}`}}
        >
            <div className={styles.daytime_bullet_text}>{rating}</div>
        </div>
    )
}

const DaytimeGraph = ({logs}) => {
    const data = mapLogsToDaytimeStats(logs);
    const darkTheme = useTheme();
    
    if (!logs || !logs.length || !data) {
        return null;
    }

    const {
        morningAverage,
        afternoonAverage,
        eveningAverage
    } = data;

    return (
        <div className={styles.daytime_container}>
            <p><strong>Your mood throughout the day:</strong></p>
            <div className={styles.daytime_canvas}>
                <svg width={"100%"} height={"100%"} overflow={"hidden"}>
                    <polyline points={"1,60 300,60"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,120 300,120"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,180 300,180"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,240 300,240"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                    <polyline points={"1,300 300,300"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
                </svg>
                {returnBullet(morningAverage, null, darkTheme)}
                {returnBullet(afternoonAverage, "48%", darkTheme)}
                {returnBullet(eveningAverage, "82%", darkTheme)}
                <div className={styles.y_axis_number_daytime} style={{top:"-12px"}}>10</div>
                <div className={styles.y_axis_number_daytime} style={{top:"48px", left: "-15px"}}>8</div>
                <div className={styles.y_axis_number_daytime} style={{top:"108px", left:"-15px"}}>6</div>
                <div className={styles.y_axis_number_daytime} style={{top:"168px", left:"-15px"}}>4</div>
                <div className={styles.y_axis_number_daytime} style={{top:"228px", left:"-15px"}}>2</div>
                <div className={styles.daytime_bottom_line}>
                    <div className={styles.daytime_time}>7:00</div>
                    <div className={styles.daytime_time} style={{left:"33%"}}>13:00</div>
                    <div className={styles.daytime_time} style={{left:"66%"}}>20:00</div>
                    <div className={styles.daytime_time} style={{left:"100%"}}>00:00</div>
                    <img 
                        src={morningIcon} 
                        style={{left:"13%", padding: "2px"}} 
                        alt="Morning"
                        className={classNames(darkTheme && styles.dark)}
                    />
                    <img 
                        src={afternoonIcon} 
                        style={{left:"48%"}} 
                        alt="Afternoon"
                        className={classNames(darkTheme && styles.dark)}
                    />
                    <img 
                        src={eveningIcon} 
                        style={{left:"82%"}} 
                        alt="Evenining"
                        className={classNames(darkTheme && styles.dark)}
                    />
                </div>    
            </div>
        </div>
    );
};

export default DaytimeGraph;