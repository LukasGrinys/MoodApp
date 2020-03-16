import React from 'react';
import styles from './stats.module.css';

import morningIcon from './morning.svg';
import afternoonIcon from './afternoon.svg';
import eveningIcon from './evening.svg';

const DaytimeGraph = ({obj, nightmode}) => {
    const returnIconClass = (nm) => {
        if (nm === "true") {
            return `${styles.daytime_icon_nightmode}`
        } else {
            return `${styles.daytime_icon}`
        }
    }
    return (
        <div className={styles.daytime_canvas}>
            <svg width={"100%"} height={"100%"} overflow={"hidden"}>
            <polyline points={"1,60 300,60"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
            <polyline points={"1,120 300,120"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
            <polyline points={"1,180 300,180"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
            <polyline points={"1,240 300,240"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
            <polyline points={"1,300 300,300"} style={{fill:"none", stroke:"#cccccc", strokeWidth:"1"}}/>
            </svg>
            <div className={styles.daytime_bullet} style={{bottom:`${obj.morningAverage * 30 -10}px`}}>
                <div className={styles.daytime_bullet_text}>{obj.morningAverage}</div>
            </div>
            <div className={styles.daytime_bullet} style={{left:"48%",bottom:`${obj.afternoonAverage * 30 -10}px`}}>
                <div className={styles.daytime_bullet_text}>{obj.afternoonAverage}</div>
            </div>
            <div className={styles.daytime_bullet} style={{left:"82%",bottom:`${obj.eveningAverage * 30 -10}px`}}>
                <div className={styles.daytime_bullet_text}>{obj.eveningAverage}</div>
            </div>
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
            <img src={morningIcon} className={returnIconClass(nightmode)} style={{left:"13%", padding: "2px"}} alt="none"/>
            <img src={afternoonIcon} className={returnIconClass(nightmode)} style={{left:"48%"}} alt="none"/>
            <img src={eveningIcon} className={returnIconClass(nightmode)} style={{left:"82%"}} alt="none"/>
            </div>    
        </div>
    );
};

export default DaytimeGraph;